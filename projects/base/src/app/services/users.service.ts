import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { UserInsertReqDto } from "@dto/user/user-insert.req.dto";
import { Observable } from "rxjs";
import { InsertResDto } from "@dto/InsertResDto";
import { ADMIN_API } from "@constant/api.constant";
import { UserResDto } from "@dto/user/user.res.dto";


@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private base: BaseService) { }

  createUser(data: UserInsertReqDto): Observable<InsertResDto> {
    return this.base.post<InsertResDto>(`${ADMIN_API}/users`, data, true)
  }

  getUsers(roleCode: string, companyCode: string): Observable<UserResDto[]> {
    return this.base.get<UserResDto[]>(`${ADMIN_API}/users/?roleCode=${roleCode}&companyCode=${companyCode}`, true)
  }

}
