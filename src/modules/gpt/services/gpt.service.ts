// src/gpt/gpt.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUserModel } from 'src/modules/users/schema/user.schema';
import OpenAI from 'openai';
import { UsersService } from 'src/modules/users/services/users.service';
import { IChatModel } from 'src/modules/chats/schema/chat.schema';
import { NameFuntions } from '../models/gpt.model';
import { CoreFunctions } from '../functions/core.functions';

@Injectable()
export class GptService {
  private openAi: OpenAI;
  private readonly gptFunctionsMap: { [key: string]: any };

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    this.openAi = new OpenAI({
      apiKey: this.configService.get<string>('GPT_TOKEN'),
    });
    this.gptFunctionsMap = {
      [0]: new CoreFunctions(usersService),
    };
  }

  async retrieveThreads(id: string) {
    const thread = await this.openAi.beta.threads.retrieve(id);
    return thread;
  }

  async generateThreads(metadata: any) {
    // TODO -> Analizar el significado de metadata al crear un thread
    const thread = await this.openAi.beta.threads.create({
      metadata: metadata,
    });
    // console.log('thread: ', thread);
    return thread;
  }

  async generateNewResponse(
    user: IUserModel,
    chat: IChatModel,
    content: string,
    botId: string,
  ) {
    const threadMessages = await this.openAi.beta.threads.messages.create(
      chat.last_thread.id,
      {
        role: 'user',
        content: content,
      },
    );
    // console.log('threadMessages: ', threadMessages);
    const run = await this.openAi.beta.threads.runs.create(
      chat.last_thread.id,
      {
        assistant_id: this.configService.get<string>(botId) || '',
      },
    );
    let runStatus = await this.openAi.beta.threads.runs.retrieve(
      chat.last_thread.id,
      run.id,
    );
    // TODO -> Implementar un sistema de colas para consultar el status en gpt
    while (runStatus.status !== 'completed') {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      runStatus = await this.openAi.beta.threads.runs.retrieve(
        chat.last_thread.id,
        run.id,
      );
      if (runStatus.status === 'requires_action') {
        if (!runStatus.required_action) {
          console.log(`AURORA - ${user.phone} - RUN STATUS 'requires_action' - required_action is null`);
          break;
        }
        const toolCalls = runStatus.required_action.submit_tool_outputs.tool_calls;
        const toolOutputs: { tool_call_id: string; output: any }[] = [];
        for (const toolCall of toolCalls) {
          const functionName: NameFuntions = toolCall.function
            .name as NameFuntions;
          const args = JSON.parse(toolCall.function.arguments);
          console.log(
            `AURORA - ${user.phone} - execute[${functionName}] - ${JSON.stringify(args, null, 2)}`,
          );
          const gptFunctions = this.gptFunctionsMap[botId];
          const output = await gptFunctions[functionName](args, chat, user);
          toolOutputs.push({
            tool_call_id: toolCall.id,
            output: output,
          });
        }
        await this.openAi.beta.threads.runs.submitToolOutputs(
          chat.last_thread.id,
          run.id,
          {
            tool_outputs: toolOutputs,
          },
        );
        continue;
      }
      if (['failed', 'cancelled', 'expired'].includes(runStatus.status)) {
        console.log(
          `AURORA - ${user.phone} - RUN STATUS '${runStatus.status}' - Unable to complete the request. Details: ${JSON.stringify(runStatus, null, 2)}`,
        );
        break;
      }
    }

    const response = await this.openAi.beta.threads.messages.list(
      chat.last_thread.id,
    );
    const lastResponse: any = response.data
      .filter(
        (message) => message.run_id === run.id && message.role === 'assistant',
      )
      .pop();

    if (lastResponse) {
      return lastResponse.content[0].text.value.replace(/\*\*/g, '*');
    } else {
      return 'FAIL';
    }
  }
}
