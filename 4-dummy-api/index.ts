import fetch from "node-fetch";

interface IApiResponse {
    users: IUser[];
    total: number;
    skip: number;
    limit: number;
}

enum Male {
    Male = "male",
    Female = "female",
}

enum BloodGroup {
    APlus = 'A+',
    AMinus = 'A-',
    OPlus = 'O+',
    OMinus = 'O-',
    BPlus = 'B+',
    BMinus = 'B-',
    ABPlus = 'AB+',
    ABMinus = 'AB-',
}

enum EyeColor {
    Green = 'Green',
    Brown = 'Brown',
    Gray = 'Gray',
    Amber = 'Amber',
    Blue = 'Blue',
}

enum Color {
    Black = 'Black',
    Blond = 'Blond',
    Chestnut = 'Chestnut',
    Brown = 'Brown',
    Auburn = 'Auburn',
}

enum Type {
    Strands = 'Strands',
    Curly = 'Curly',
    VeryCurly = 'Very curly',
    Straight = 'Straight',
    Wavy = 'Wavy',
}

enum CardType {
    Maestro = 'maestro',
    Mastercard = 'mastercard',
    Jcb = 'jcb',
    VisaElectron = 'visa-electron',
    Americanexpress = 'americanexpress',
    DinersClubCarteBlanche = 'diners-club-carte-blanche',
    Bankcard = 'bankcard',
    Instapayment = 'instapayment',
    Switch = 'switch',
    Solo = 'solo',
}

enum CryptoCurrency {
    Bitcoin = 'Bitcoin',
}


enum Department {
    Marketing = 'Marketing',
    Services = 'Services',
    BusinessDevelopment = 'Business Development',
    Support = 'Support',
    Accounting = 'Accounting',
    ProductManagement = 'Product Management',
    HumanResources = 'Human Resources',
    ResearchAndDevelopment = 'Research and Development',
    Sales = 'Sales',
    Legal = 'Legal',
    Engineering = 'Engineering',

}

type MaleUnion = `${Male}`;
type BloodGroupUnion = `${BloodGroup}`;
type EyeColorUnion = `${EyeColor}`;
type ColorUnion = `${Color}`;
type TypeUnion = `${Type}`;
type CardTypeUnion = `${CardType}`;
type CryptoCurrencyUnion = `${CryptoCurrency}`;
type DepartmentUnion = `${Department}`;

interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: MaleUnion;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: BloodGroupUnion;
    height: number;
    weight: number;
    eyeColor: EyeColorUnion;
    hair: {
        color: ColorUnion;
        type: TypeUnion,
    },
    domain: string;
    ip: string;
    address: {
        address: string;
        city: string;
        coordinates: {
            lat: number;
            lng: number;
        },
        postalCode: string;
        state: string;
    },
    macAddress: string;
    university: string;
    bank: {
        cardExpire: string;
        cardNumber: string;
        cardType: CardTypeUnion,
        currency: string,
        iban: string;
    },
    company: {
        address: {
            address: string;
            city: string;
            coordinates: {
                lat: number;
                lng: number;
            },
            postalCode: string;
            state: string;
        },
        department: DepartmentUnion;
        name: string;
        title: string;
    },
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: {
        coin: CryptoCurrencyUnion;
        wallet: string;
        network: string;
    }
}

function assertsUsers(data: unknown): asserts data is IApiResponse {
    if (data && typeof data === 'object' && 'users' in data && 'limit' in data && 'total' in data && 'skip' in data) {
        return;
    }

    throw new Error('Non valid response')
}

const fetchUsers = async (url: string): Promise<any> => {
    const data = await fetch(url);
    const data_ = await data.json()
    assertsUsers(data_);
    return data_;
}

const url = 'https://dummyjson.com/users'

fetchUsers(url)