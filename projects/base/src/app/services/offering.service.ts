import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { OfferingInsertReqDto } from "@dto/offering/offering-insert.req.dto";
import { Observable } from "rxjs";
import { InsertResDto } from "@dto/InsertResDto";
import { ADMIN_API } from "@constant/api.constant";

@Injectable({
    providedIn: 'root'
})
export class OfferingService {

    constructor(private base: BaseService){}

    insertOffering(data: OfferingInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${ADMIN_API}/offerings`, data, true)
    }
}