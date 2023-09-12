import { MCCManagementService } from '@core/services';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
export const MockMCCList = [
    {
        mcc_code: 9950,
        mcc_name: 'Intra - Company Purchases ( For Visa Only)',
        group_name: 'test 01',
    },
    {
        mcc_code: 9702,
        mcc_name: 'GCAS Emergency Services ( For Visa Only)',
        group_name: 'test 01',
    },
    {
        mcc_code: 9701,
        mcc_name: 'Visa Credential Service ( For Visa Only)',
        group_name: 'test 01',
    },
    {
        mcc_code: 9700,
        mcc_name: 'Automated Referral Service (For Visa Only)',
        group_name: 'test 01',
    },
    {
        mcc_code: 9405,
        mcc_name: 'Intra - Government Transactions',
        group_name: 'test 01',
    },
    {
        mcc_code: 9402,
        mcc_name: 'Postal Services - Government Only',
        group_name: 'Test add groiup',
    },
    {
        mcc_code: 9399,
        mcc_name: 'Government Services ( Not Elsewhere Classified)',
        group_name: 'Edit group',
    },
    {
        mcc_code: 9311,
        mcc_name: 'Tax Payments',
        group_name: 'test 01',
    },
    {
        mcc_code: 9223,
        mcc_name: 'Bail and Bond Payments',
        group_name: 'Test add groiup',
    },
    {
        mcc_code: 9222,
        mcc_name: 'Fines',
        group_name: 'test 01',
    },
]
export const MockMCCStatus = [
    {
        value: '1',
        desc: 'active',
    },
    {
        value: '0',
        desc: 'inactive',
    },
]
export const MockMCCGroup = [
    {
        group_code: '785226',
        group_name: 'nhóm 785226',
        description: null,
        status: '1',
        mcc_count: 13,
    },
    {
        group_code: '777777',
        group_name: 'nhóm 777777',
        description: null,
        status: '1',
        mcc_count: 0,
    },
    {
        group_code: '555555',
        group_name: 'Nhóm MCC 02',
        description: null,
        status: '0',
        mcc_count: 5,
    },
]
@Injectable()
export class MockMCCService extends MCCManagementService {
    getGroupList(body: any) {
        return of({
            error_code: '00',
            list_data: MockMCCGroup,
            total_record: MockMCCGroup.length
        })
    }

}