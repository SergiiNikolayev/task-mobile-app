import { ApisauceInstance, create } from 'apisauce'
import { GeneralApiProblem } from './apiProblem'
import type { ApiConfig } from './api.types'
import { handleApiProblem } from './handleApiProblem'

const API_KEY = '7e75c7e79e75526a78a624336893e4ab'
const API_URL = 'https://api.openweathermap.org/'
const API_WEATHER_DATA = 'data/2.5/weather?'
const API_WEATHER_GEO = 'geo/1.0/direct?'

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL,
  timeout: 10000,
}

export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
      },
    })
    this.apisauce.addRequestTransform((request) => {
      request.url = request.url + `&appid=${API_KEY}`
    })
  }

  async getCityGeolocation(
    cityName?: string,
  ): Promise<{ kind: 'ok'; data: any } | (GeneralApiProblem & { message?: string })> {
    const response = await this.apisauce.get(`${API_WEATHER_GEO}q=${cityName}&limit=10`)

    if (!response.ok) {
      return handleApiProblem(response)
    }

    return { kind: 'ok', data: response.data }
  }

  async getCityWeather(
    lat: number,
    lon: number,
    units?: string,
  ): Promise<{ kind: 'ok'; data: any } | (GeneralApiProblem & { message?: string })> {
    const response = await this.apisauce.get(`${API_WEATHER_DATA}lat=${lat}&lon=${lon}&units=${units}`)

    if (!response.ok) {
      return handleApiProblem(response)
    }

    return { kind: 'ok', data: response.data }
  }
}

export const api = new Api()
