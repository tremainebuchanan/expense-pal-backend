import { Injectable } from '@nestjs/common';
import cheerio from 'cheerio'
import axios, { AxiosResponse } from 'axios'
import perf from 'perflog';
@Injectable()
export class BillerService {
    private url:string = "https://www.nwcjamaica.com/bill_query.php";
    
    private prepareQueryString(customerCode: string, premisesCode:string):string{
        const payload = {
            'txtCustomerCode': customerCode,
              'txtPremisesCode': premisesCode,
              'cmdAction': 'Find'
        };
        const qs = Object.keys(payload).map(key => `${key}=${payload[key]}`).join('&');
        return qs;
    }

    public async show(customerCode: string, premisesCode:string): Promise<any> {
        const qs = this.prepareQueryString(customerCode, premisesCode);
        const response = await this.fetchData(qs);
        const result = this.processResponse(response);
        return result;
    }

    private async fetchData(qs):Promise<AxiosResponse<any, any>>{
        const response = await axios({
            'method': 'post',
            'data': qs,
            'url': this.url,
            'headers': {
                Cookie: "PHPSESSID:e8s9nntdlqc0fed9hcmhet9ko0",
            }
        });
        return response;
    }

    private processResponse(response: AxiosResponse){
        const html = response.data;
         const $ = cheerio.load(html);
         let combinedHeadersAndValues = [];
         $('.form-group', html).each(function(){
             const paragraphsInFormGroup = $(this).children()
             paragraphsInFormGroup.each(function(){
                 combinedHeadersAndValues.push($(this).text())
             })
         });
     
         let headers = [];
         let values = [];
         let result = {};
         combinedHeadersAndValues.forEach((function(item, index){
             index % 2 == 0 ? headers.push(item):values.push(item);
         }));
     
         headers.forEach(function(header, index){
             result[header] = values[index];
         });
         if(result["Bill Print Date"] == "") result["Bill Print Date"] = "0000-00-00";
         return result;
    }
}
