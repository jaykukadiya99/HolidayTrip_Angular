export class Package {
    public Id? : string;
    public Title : string;
    public CategoryId : string[];
    public Days : number;
    public FixedDepartureDate : string;
    public Description : string;
    public Itinerary : any[];
    public Inclusion : string;
    public Exclusion : string;
    public OtherInfo : string;
    public TandC : string;
    public CityIncluded : string[];
    public Price : Number;
    public PriceDesc : string;
}
