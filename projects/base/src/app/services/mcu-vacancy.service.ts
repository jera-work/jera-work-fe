import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { McuVacancyInsertReqDto } from "@dto/mcu-vacancy/mcu-vacancy-insert.req.dto";
import { Observable } from "rxjs";
import { InsertResDto } from "@dto/insert.res.dto";
import { ADMIN_API } from "@constant/api.constant";

@Injectable({
    providedIn: 'root'
})
export class McuVacancyService {
    
    constructor(private base: BaseService){}

    insertMcu(data: McuVacancyInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${ADMIN_API}/mcus`, data, true)
    }
}