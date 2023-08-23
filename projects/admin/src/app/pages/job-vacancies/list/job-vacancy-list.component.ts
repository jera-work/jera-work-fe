import { Component, OnInit } from "@angular/core";
import { JobVacancyResDto } from "@dto/job-vacancy/job-vacancy.res.dto";
import { Table } from "primeng/table";

@Component({
    selector : 'job-vacancy-list',
    templateUrl : './job-vacancy-list.component.html'
})
export class JobVacancyListComponent implements OnInit{

    visible = false

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    jobVacancies : JobVacancyResDto[] = []
    jobVacancy? : JobVacancyResDto

    ngOnInit(): void {
    //     this.loading = false;
    //     this.jobVacancies.push({
    //         id : 'ac0bb0c8-cb58-4399-b155-436a837d7859',
    //         vacancyCode : 'VA001',
    //         vacancyTitle : 'Fullstack Developer',
    //         picHrName : 'Rendy',
    //         picUserName : 'Riandy',
    //         startDate : '2021-01-07',
    //         endDate : '2021-01-07',
    //         expLevelName : 'Junior',
    //         availableStatusName : 'Open',
    //         companyName : 'Adidas',

    //         degreeName : 'S1 - Bachelor',
    //         genderName : 'Male',
    //         ageVacancyName : 'Below 20',
    //         jobTypeName : 'Fulltime',
    //         salary : 'Rp.4.000.000',
    //         cityName : 'Jakarta',
    //         address : 'Jalan Raya Kokas',
    //         description : 'Deskripsi'
    //     })

    //     this.jobVacancies.push({
    //         id : 'ac0bb0c8-cb58-4399-b155-436a837d7859',
    //         vacancyCode : 'VA002',
    //         vacancyTitle : 'Fullstack Developer',
    //         picHrName : 'Darma',
    //         picUserName : 'Prima',
    //         startDate : '2021-01-07',
    //         endDate : '2021-01-07',
    //         expLevelName : 'Senior',
    //         availableStatusName : 'Close',
    //         companyName : 'Adidas',

    //         degreeName : 'S1 - Bachelor',
    //         genderName : 'Male',
    //         ageVacancyName : 'Below 20',
    //         jobTypeName : 'Fulltime',
    //         salary : 'Rp.7.000.000',
    //         cityName : 'Jakarta',
    //         address : 'Jalan Casablanca Raya, Kav. 88 12870 Jakarta Selatan Daerah Khusus Ibukota Jakarta ',
    //         description : 'PT. Adidas adalah perusahaan yang memproduksi alat olahraga'
    //     })

    //     this.jobVacancies.push({
    //         id : 'ac0bb0c8-cb58-4399-b155-436a837d7859',
    //         vacancyCode : 'VA002',
    //         vacancyTitle : 'Fullstack Developer',
    //         picHrName : 'Darma',
    //         picUserName : 'Prima',
    //         startDate : '2021-01-07',
    //         endDate : '2021-01-07',
    //         expLevelName : 'Senior',
    //         availableStatusName : 'Close',
    //         companyName : 'Adidas',

    //         degreeName : 'S1 - Bachelor',
    //         genderName : 'Male',
    //         ageVacancyName : 'Below 20',
    //         jobTypeName : 'Fulltime',
    //         salary : 'Rp.7.000.000',
    //         cityName : 'Jakarta',
    //         address : 'Jalan Casablanca Raya, Kav. 88 12870 Jakarta Selatan Daerah Khusus Ibukota Jakarta ',
    //         description : 'PT. Adidas adalah perusahaan yang memproduksi alat olahraga'
    //     })

    //     this.jobVacancies.push({
    //         id : 'ac0bb0c8-cb58-4399-b155-436a837d7859',
    //         vacancyCode : 'VA002',
    //         vacancyTitle : 'Fullstack Developer',
    //         picHrName : 'Darma',
    //         picUserName : 'Prima',
    //         startDate : '2021-01-07',
    //         endDate : '2021-01-07',
    //         expLevelName : 'Senior',
    //         availableStatusName : 'Close',
    //         companyName : 'Adidas',

    //         degreeName : 'S1 - Bachelor',
    //         genderName : 'Male',
    //         ageVacancyName : 'Below 20',
    //         jobTypeName : 'Fulltime',
    //         salary : 'Rp.7.000.000',
    //         cityName : 'Jakarta',
    //         address : 'Jalan Casablanca Raya, Kav. 88 12870 Jakarta Selatan Daerah Khusus Ibukota Jakarta ',
    //         description : 'PT. Adidas adalah perusahaan yang memproduksi alat olahraga'
    //     })

    //     this.jobVacancies.push({
    //         id : 'ac0bb0c8-cb58-4399-b155-436a837d7859',
    //         vacancyCode : 'VA002',
    //         vacancyTitle : 'Fullstack Developer',
    //         picHrName : 'Darma',
    //         picUserName : 'Prima',
    //         startDate : '2021-01-07',
    //         endDate : '2021-01-07',
    //         expLevelName : 'Senior',
    //         availableStatusName : 'Close',
    //         companyName : 'Adidas',

    //         degreeName : 'S1 - Bachelor',
    //         genderName : 'Male',
    //         ageVacancyName : 'Below 20',
    //         jobTypeName : 'Fulltime',
    //         salary : 'Rp.7.000.000',
    //         cityName : 'Jakarta',
    //         address : 'Jalan Casablanca Raya, Kav. 88 12870 Jakarta Selatan Daerah Khusus Ibukota Jakarta ',
    //         description : 'PT. Adidas adalah perusahaan yang memproduksi alat olahraga'
    //     })

    //     this.jobVacancies.push({
    //         id : 'ac0bb0c8-cb58-4399-b155-436a837d7859',
    //         vacancyCode : 'VA002',
    //         vacancyTitle : 'Fullstack Developer',
    //         picHrName : 'Darma',
    //         picUserName : 'Prima',
    //         startDate : '2021-01-07',
    //         endDate : '2021-01-07',
    //         expLevelName : 'Senior',
    //         availableStatusName : 'Close',
    //         companyName : 'Adidas',

    //         degreeName : 'S1 - Bachelor',
    //         genderName : 'Male',
    //         ageVacancyName : 'Below 20',
    //         jobTypeName : 'Fulltime',
    //         salary : 'Rp.7.000.000',
    //         cityName : 'Jakarta',
    //         address : 'Jalan Casablanca Raya, Kav. 88 12870 Jakarta Selatan Daerah Khusus Ibukota Jakarta ',
    //         description : 'PT. Adidas adalah perusahaan yang memproduksi alat olahraga'
    //     })

    //     this.jobVacancies.push({
    //         id : 'ac0bb0c8-cb58-4399-b155-436a837d7859',
    //         vacancyCode : 'VA002',
    //         vacancyTitle : 'Fullstack Developer',
    //         picHrName : 'Darma',
    //         picUserName : 'Prima',
    //         startDate : '2021-01-07',
    //         endDate : '2021-01-07',
    //         expLevelName : 'Senior',
    //         availableStatusName : 'Close',
    //         companyName : 'Adidas',

    //         degreeName : 'S1 - Bachelor',
    //         genderName : 'Male',
    //         ageVacancyName : 'Below 20',
    //         jobTypeName : 'Fulltime',
    //         salary : 'Rp.7.000.000',
    //         cityName : 'Jakarta',
    //         address : 'Jalan Casablanca Raya, Kav. 88 12870 Jakarta Selatan Daerah Khusus Ibukota Jakarta ',
    //         description : 'PT. Adidas adalah perusahaan yang memproduksi alat olahraga'
    //     })

    //     this.jobVacancies.push({
    //         id : 'ac0bb0c8-cb58-4399-b155-436a837d7859',
    //         vacancyCode : 'VA002',
    //         vacancyTitle : 'Fullstack Developer',
    //         picHrName : 'Darma',
    //         picUserName : 'Prima',
    //         startDate : '2021-01-07',
    //         endDate : '2021-01-07',
    //         expLevelName : 'Senior',
    //         availableStatusName : 'Close',
    //         companyName : 'Adidas',

    //         degreeName : 'S1 - Bachelor',
    //         genderName : 'Male',
    //         ageVacancyName : 'Below 20',
    //         jobTypeName : 'Fulltime',
    //         salary : 'Rp.7.000.000',
    //         cityName : 'Jakarta',
    //         address : 'Jalan Casablanca Raya, Kav. 88 12870 Jakarta Selatan Daerah Khusus Ibukota Jakarta ',
    //         description : 'PT. Adidas adalah perusahaan yang memproduksi alat olahraga'
    //     })

    //     this.jobVacancies.push({
    //         id : 'ac0bb0c8-cb58-4399-b155-436a837d7859',
    //         vacancyCode : 'VA002',
    //         vacancyTitle : 'Fullstack Developer',
    //         picHrName : 'Darma',
    //         picUserName : 'Prima',
    //         startDate : '2021-01-07',
    //         endDate : '2021-01-07',
    //         expLevelName : 'Senior',
    //         availableStatusName : 'Close',
    //         companyName : 'Adidas',

    //         degreeName : 'S1 - Bachelor',
    //         genderName : 'Male',
    //         ageVacancyName : 'Below 20',
    //         jobTypeName : 'Fulltime',
    //         salary : 'Rp.7.000.000',
    //         cityName : 'Jakarta',
    //         address : 'Jalan Casablanca Raya, Kav. 88 12870 Jakarta Selatan Daerah Khusus Ibukota Jakarta ',
    //         description : 'PT. Adidas adalah perusahaan yang memproduksi alat olahraga'
    //     })

    //     this.jobVacancies.push({
    //         id : 'ac0bb0c8-cb58-4399-b155-436a837d7859',
    //         vacancyCode : 'VA002',
    //         vacancyTitle : 'Fullstack Developer',
    //         picHrName : 'Darma',
    //         picUserName : 'Prima',
    //         startDate : '2021-01-07',
    //         endDate : '2021-01-07',
    //         expLevelName : 'Senior',
    //         availableStatusName : 'Close',
    //         companyName : 'Adidas',

    //         degreeName : 'S1 - Bachelor',
    //         genderName : 'Male',
    //         ageVacancyName : 'Below 20',
    //         jobTypeName : 'Fulltime',
    //         salary : 'Rp.7.000.000',
    //         cityName : 'Jakarta',
    //         address : 'Jalan Casablanca Raya, Kav. 88 12870 Jakarta Selatan Daerah Khusus Ibukota Jakarta ',
    //         description : 'PT. Adidas adalah perusahaan yang memproduksi alat olahraga'
    //     })

    //     this.jobVacancies.push({
    //         id : 'ac0bb0c8-cb58-4399-b155-436a837d7859',
    //         vacancyCode : 'VA002',
    //         vacancyTitle : 'Fullstack Developer',
    //         picHrName : 'Darma',
    //         picUserName : 'Prima',
    //         startDate : '2021-01-07',
    //         endDate : '2021-01-07',
    //         expLevelName : 'Senior',
    //         availableStatusName : 'Close',
    //         companyName : 'Adidas',

    //         degreeName : 'S1 - Bachelor',
    //         genderName : 'Male',
    //         ageVacancyName : 'Below 20',
    //         jobTypeName : 'Fulltime',
    //         salary : 'Rp.7.000.000',
    //         cityName : 'Jakarta',
    //         address : 'Jalan Casablanca Raya, Kav. 88 12870 Jakarta Selatan Daerah Khusus Ibukota Jakarta ',
    //         description : 'PT. Adidas adalah perusahaan yang memproduksi alat olahraga'
    //     })

    //     this.jobVacancies.push({
    //         id : 'ac0bb0c8-cb58-4399-b155-436a837d7859',
    //         vacancyCode : 'VA002',
    //         vacancyTitle : 'Fullstack Developer',
    //         picHrName : 'Darma',
    //         picUserName : 'Prima',
    //         startDate : '2021-01-07',
    //         endDate : '2021-01-07',
    //         expLevelName : 'Senior',
    //         availableStatusName : 'Close',
    //         companyName : 'Adidas',

    //         degreeName : 'S1 - Bachelor',
    //         genderName : 'Male',
    //         ageVacancyName : 'Below 20',
    //         jobTypeName : 'Fulltime',
    //         salary : 'Rp.7.000.000',
    //         cityName : 'Jakarta',
    //         address : 'Jalan Casablanca Raya, Kav. 88 12870 Jakarta Selatan Daerah Khusus Ibukota Jakarta ',
    //         description : 'PT. Adidas adalah perusahaan yang memproduksi alat olahraga'
    //     })

    //     this.jobVacancies.push({
    //         id : 'ac0bb0c8-cb58-4399-b155-436a837d7859',
    //         vacancyCode : 'VA002',
    //         vacancyTitle : 'Fullstack Developer',
    //         picHrName : 'Darma',
    //         picUserName : 'Prima',
    //         startDate : '2021-01-07',
    //         endDate : '2021-01-07',
    //         expLevelName : 'Senior',
    //         availableStatusName : 'Close',
    //         companyName : 'Adidas',

    //         degreeName : 'S1 - Bachelor',
    //         genderName : 'Male',
    //         ageVacancyName : 'Below 20',
    //         jobTypeName : 'Fulltime',
    //         salary : 'Rp.7.000.000',
    //         cityName : 'Jakarta',
    //         address : 'Jalan Casablanca Raya, Kav. 88 12870 Jakarta Selatan Daerah Khusus Ibukota Jakarta ',
    //         description : 'PT. Adidas adalah perusahaan yang memproduksi alat olahraga'
    //     })

    //     this.jobVacancies.push({
    //         id : 'ac0bb0c8-cb58-4399-b155-436a837d7859',
    //         vacancyCode : 'VA002',
    //         vacancyTitle : 'Fullstack Developer',
    //         picHrName : 'Darma',
    //         picUserName : 'Prima',
    //         startDate : '2021-01-07',
    //         endDate : '2021-01-07',
    //         expLevelName : 'Senior',
    //         availableStatusName : 'Close',
    //         companyName : 'Adidas',

    //         degreeName : 'S1 - Bachelor',
    //         genderName : 'Male',
    //         ageVacancyName : 'Below 20',
    //         jobTypeName : 'Fulltime',
    //         salary : 'Rp.7.000.000',
    //         cityName : 'Jakarta',
    //         address : 'Jalan Casablanca Raya, Kav. 88 12870 Jakarta Selatan Daerah Khusus Ibukota Jakarta ',
    //         description : 'PT. Adidas adalah perusahaan yang memproduksi alat olahraga'
    //     })

    //     this.jobVacancies.push({
    //         id : 'ac0bb0c8-cb58-4399-b155-436a837d7859',
    //         vacancyCode : 'VA002',
    //         vacancyTitle : 'Fullstack Developer',
    //         picHrName : 'Darma',
    //         picUserName : 'Prima',
    //         startDate : '2021-01-07',
    //         endDate : '2021-01-07',
    //         expLevelName : 'Senior',
    //         availableStatusName : 'Close',
    //         companyName : 'Adidas',

    //         degreeName : 'S1 - Bachelor',
    //         genderName : 'Male',
    //         ageVacancyName : 'Below 20',
    //         jobTypeName : 'Fulltime',
    //         salary : 'Rp.7.000.000',
    //         cityName : 'Jakarta',
    //         address : 'Jalan Casablanca Raya, Kav. 88 12870 Jakarta Selatan Daerah Khusus Ibukota Jakarta ',
    //         description : 'PT. Adidas adalah perusahaan yang memproduksi alat olahraga'
    //     })

    //     this.jobVacancies.push({
    //         id : 'ac0bb0c8-cb58-4399-b155-436a837d7859',
    //         vacancyCode : 'VA002',
    //         vacancyTitle : 'Fullstack Developer',
    //         picHrName : 'Darma',
    //         picUserName : 'Prima',
    //         startDate : '2021-01-07',
    //         endDate : '2021-01-07',
    //         expLevelName : 'Senior',
    //         availableStatusName : 'Close',
    //         companyName : 'Adidas',

    //         degreeName : 'S1 - Bachelor',
    //         genderName : 'Male',
    //         ageVacancyName : 'Below 20',
    //         jobTypeName : 'Fulltime',
    //         salary : 'Rp.7.000.000',
    //         cityName : 'Jakarta',
    //         address : 'Jalan Casablanca Raya, Kav. 88 12870 Jakarta Selatan Daerah Khusus Ibukota Jakarta ',
    //         description : 'PT. Adidas adalah perusahaan yang memproduksi alat olahraga'
    //     })

    //     this.jobVacancies.push({
    //         id : 'ac0bb0c8-cb58-4399-b155-436a837d7859',
    //         vacancyCode : 'VA002',
    //         vacancyTitle : 'Fullstack Developer',
    //         picHrName : 'Darma',
    //         picUserName : 'Prima',
    //         startDate : '2021-01-07',
    //         endDate : '2021-01-07',
    //         expLevelName : 'Senior',
    //         availableStatusName : 'Close',
    //         companyName : 'Adidas',

    //         degreeName : 'S1 - Bachelor',
    //         genderName : 'Male',
    //         ageVacancyName : 'Below 20',
    //         jobTypeName : 'Fulltime',
    //         salary : 'Rp.7.000.000',
    //         cityName : 'Jakarta',
    //         address : 'Jalan Casablanca Raya, Kav. 88 12870 Jakarta Selatan Daerah Khusus Ibukota Jakarta ',
    //         description : 'PT. Adidas adalah perusahaan yang memproduksi alat olahraga'
    //     })

    //     this.jobVacancies.push({
    //         id : 'ac0bb0c8-cb58-4399-b155-436a837d7859',
    //         vacancyCode : 'VA0018',
    //         vacancyTitle : 'Fullstack Developer',
    //         picHrName : 'Darma',
    //         picUserName : 'Prima',
    //         startDate : '2021-01-07',
    //         endDate : '2021-01-07',
    //         expLevelName : 'Senior',
    //         availableStatusName : 'Close',
    //         companyName : 'Adidas',

    //         degreeName : 'S1 - Bachelor',
    //         genderName : 'Male',
    //         ageVacancyName : 'Below 20',
    //         jobTypeName : 'Fulltime',
    //         salary : 'Rp.7.000.000',
    //         cityName : 'Jakarta',
    //         address : 'Jalan Casablanca Raya, Kav. 88 12870 Jakarta Selatan Daerah Khusus Ibukota Jakarta ',
    //         description : 'PT. Adidas adalah perusahaan yang memproduksi alat olahraga'
    //     })
    //     console.log(this.jobVacancies)
    }

    clear(table: Table) {
        table.clear();
    }

    getStatusSeverity(status: string) {
        switch (status) {
            case 'Open':
                return 'success';
            case 'Close':
                return 'danger';
            default: 
                return 'danger'
        }
    }
    prevPage(){
        
    }

    nextPage(){

    }


}