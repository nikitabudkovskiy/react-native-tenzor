import { ApiService } from 'app/system/api'

export class MainRequest {
    static appSettingsRequest = (params: IAppSettingsRequest): Promise<ISettingsInformation> => {
        return ApiService.get(
            'http://tbeauteam.appsj.su/get-app-settings.json',
            { params }
        )
    }
    
    static townsRequest = (params: ITownsRequest): Promise<ITownsResponce> => {
        return ApiService.get(
            'http://tbeauteam.appsj.su/towns.json',
            { params }
        )
    }

    static getOrganisations = (params: IGetOrganisationsRequest): Promise<IGetOrganisationsResponce> => {
        return ApiService.get(
            'http://tbeauteam.appsj.su/get-organizations.json',
            { params }
        )
    }
}



