export class Pagination {
  page: number;
  limit: number;
  offset: number;
  total: number;
  totalPages: number;

  constructor(total: number, page?: string | number, limit?: string | number) {
    this.total = total;
    this.page = Number(page) || 1;
    this.limit = Number(limit) || 10;
    this.offset = (this.page - 1) * this.limit;
    this.totalPages = Math.ceil(this.total / this.limit);
  }
}
