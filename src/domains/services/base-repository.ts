export interface BaseRepository<I,T> {
  create(props: T): Promise<T>;
  read(props: Partial<I>): Promise<T>;
  update(props: Partial<I>): Promise<T>;
  delete(id: string): Promise<boolean>;
}
