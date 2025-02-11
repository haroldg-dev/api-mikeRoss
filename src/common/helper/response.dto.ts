export class ResponseDto<T> {
  static format(trace: string, data: any, totalPages: number | null) {
    if (totalPages || totalPages === 0) {
      return { trace, payload: { data, totalPages } };
    }
    return { trace, payload: { data } };
  }
}
