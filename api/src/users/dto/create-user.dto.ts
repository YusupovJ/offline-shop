export class CreateUserDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  tgId: number;
  role?: "admin" | "user";
}
