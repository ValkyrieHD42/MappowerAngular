export class Borne {
  private _title: any;
  private _locationDetails: LocationDetails;
  private _operatorDetails: OperatorDetails;
  private _usageDetails: UsageDetails;
  private _dataprovider: DataProvider;
  private _powerConnections: any[];

    constructor(json: any) {
        this._title = json['AddressInfo']['Title'];
        this._locationDetails = new LocationDetails(json);
        this._operatorDetails = new OperatorDetails(json);
        this._usageDetails = new UsageDetails(json);
        this._dataprovider = new DataProvider(json);
        this._powerConnections = new Array();
        if(json['Connections'] != null) {
            json['Connections'].map((equipment: any) => {
                this._powerConnections.push(new PowerConnection(equipment));
            })
        }
    }


  get title(): any {
    return this._title;
  }

  get locationDetails(): LocationDetails {
    return this._locationDetails;
  }

  get operatorDetails(): OperatorDetails {
    return this._operatorDetails;
  }

  get usageDetails(): UsageDetails {
    return this._usageDetails;
  }

  get dataprovider(): DataProvider {
    return this._dataprovider;
  }

  get powerConnections(): any[] {
    return this._powerConnections;
  }
}

export class LocationDetails {
  private _latitude: any;
  private _longitude: any;
  private _address: any;
  private _city: any;
  private _postalCode: any;
  private _country: any;

    constructor(json: any) {
        if(json['AddressInfo']) {
            this._latitude = json['AddressInfo']['Latitude'];
            this._longitude = json['AddressInfo']['Longitude'];
            this._address = json['AddressInfo']['AddressLine1'];
            this._city = json['AddressInfo']['Town'];
            this._postalCode = json['AddressInfo']['Postcode'];
            this._country = json['AddressInfo']['Country']['Title'];
        }
    }


  get latitude(): any {
    return this._latitude;
  }

  get longitude(): any {
    return this._longitude;
  }

  get address(): any {
    return this._address;
  }

  get city(): any {
    return this._city;
  }

  get postalCode(): any {
    return this._postalCode;
  }

  get country(): any {
    return this._country;
  }
}

export class UsageDetails {
  private _operationalStatus: any;
  private _usageType: any;
  private _usageCost: any;

    constructor(json: any) {
        this._operationalStatus = null;
        if(json['StatusType']) {
            this._operationalStatus = json['StatusType']['IsOperational'];
        }
        this._usageType = null;
        if(json['UsageType']) {
            this._usageType = json['UsageType']['Title'];
        }
        this._usageCost = json['UsageCost'];
    }


  get operationalStatus(): any {
    return this._operationalStatus;
  }

  get usageType(): any {
    return this._usageType;
  }

  get usageCost(): any {
    return this._usageCost;
  }
}

export class OperatorDetails {
  private _name: any;
  private _website: any;
  private _phone: any;
  private _contactEmail: any;
  private _savEmail: any;

    constructor(operatorJson: any) {
        if(operatorJson['OperatorInfo']) {
            this._name = operatorJson['OperatorInfo']['Title'];
            this._website = operatorJson['OperatorInfo']['WebsiteURL'];
            this._phone = operatorJson['OperatorInfo']['PhonePrimaryContact'];
            this._contactEmail = operatorJson['OperatorInfo']['ContactEmail'];
            this._savEmail = operatorJson['OperatorInfo']['FaultReportEmail'];
        }

    }


  get name(): any {
    return this._name;
  }

  get website(): any {
    return this._website;
  }

  get phone(): any {
    return this._phone;
  }

  get contactEmail(): any {
    return this._contactEmail;
  }

  get savEmail(): any {
    return this._savEmail;
  }
}

export class DataProvider {
  private _title: any;
  private _website: any;
  private _license: any;
    constructor(providerJson: any) {
        if(providerJson['DataProvider']) {
            this._title = providerJson['DataProvider']['Title'];
            this._website = providerJson['DataProvider']['WebsiteURL'];
            this._license = providerJson['DataProvider']['License']
        }

    }


  get title(): any {
    return this._title;
  }

  get website(): any {
    return this._website;
  }

  get license(): any {
    return this._license;
  }
}

export class PowerConnection {
  private _currentType: any;
  private _amps: any;
  private _voltage: any;
  private _power: any;
  private _quantity: any;
  private _title: any;

    constructor(connectionJson: any) {
        this._currentType = connectionJson['CurrentType'] ? connectionJson['CurrentType']['Title'] : null;
        this._amps = connectionJson['Amps'];
        this._voltage = connectionJson['Voltage'];
        this._power = connectionJson['PowerKW'];
        this._quantity = connectionJson['Quantity'];
        this._title = connectionJson['ConnectionType'] ? connectionJson['ConnectionType']['Title'] : null;
    }


  get currentType(): any {
    return this._currentType;
  }

  get amps(): any {
    return this._amps;
  }

  get voltage(): any {
    return this._voltage;
  }

  get power(): any {
    return this._power;
  }

  get quantity(): any {
    return this._quantity;
  }

  get title(): any {
    return this._title;
  }
}
