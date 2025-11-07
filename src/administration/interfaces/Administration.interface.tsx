export interface Group {
    id?: number,
    name?: string,
    permissions?: number[]
};

export interface Permission{
    id: number,
    name:string,
    codename: string,
    content_type: ContentType
}

export interface ContentType{
    id: number,
    app_label: string,
    model: string
}


