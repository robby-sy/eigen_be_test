import type { IMember, Member } from "../models/member";
import type { BaseRepository } from "./base-repository";

export interface MemberRepository extends BaseRepository<IMember, Member> {
  borrowBook(memberId: string, bookName: string): Promise<boolean>;
  returnBook(memberId: string, bookName: string): Promise<boolean>;
  findAllMember(): Promise<Member[]>;
}
