export class DirectUserMessage {
    name: string;

    constructor(obj?: any) { 
        this.name = obj ? obj.name : '';
    }

    public toJson() {
        return {
            name: this.name,
        }
    }
}