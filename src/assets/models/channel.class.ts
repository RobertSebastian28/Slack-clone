export class Channel {
    name: string;
    description: string;

    constructor(obj?: any) { 
        this.name = obj ? obj.name : '';
        this.description = obj ? obj.description: '';
    }

    public toJson() {
        return {
            name: this.name,
            description: this.description
        }
    }
}