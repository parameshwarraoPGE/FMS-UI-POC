
export const TickSize:Array<scripObject> =[
    {
        label:'Crude Oil',
        lotSize: 100,
        basevalueInfo:"Base value per Barrel",
        tradingUnitInfo:"Trading unit 100 BBL(Barrel) i.e per 100 BBL"
    },
    {
        label:'Gold',
        lotSize: 100,
        basevalueInfo:"Base value per 10 Grams",
        tradingUnitInfo:"Trading unit 1 Kg i.e per 100 Grams"
    },
    {
        label:'GOLD GUINEA',
        lotSize: 1,
        basevalueInfo:"Base value per 8 Grams",
        tradingUnitInfo:"Trading unit 8 Grams i.e per 8 grams"
    },
    {
        label:'GOLDM',
        lotSize: 10,
        basevalueInfo:"Base value per 10 Grams",
        tradingUnitInfo:"Trading unit 100 Grams i.e per 100 grams"
    },
    {
        label:'GOLD PETAL',
        lotSize: 1,
        basevalueInfo:"Base value per Gram",
        tradingUnitInfo:"Trading unit1 Gram i.e per gram"
    },
    {
        label:'SILVER',
        lotSize: 30,
        basevalueInfo:"Base value per Kg",
        tradingUnitInfo:"Trading unit 30 Kg i.e per 30kg"
    },
    {
        label:'SILVERM',
        lotSize: 5,
        basevalueInfo:"Base value per Kg",
        tradingUnitInfo:"Trading unit 5Kg i.e per 5kg"
    },
    {
        label:'SILVERMIC',
        lotSize: 1,
        basevalueInfo:"Base value per Kg",
        tradingUnitInfo:"Trading unit 1Kg i.e per kg"
    },
    {
        label:'NATURAL GAS',
        lotSize: 1250,
        basevalueInfo:"Base value per MMBTU. MMBTU = Million Metric Terminal Units.",
        tradingUnitInfo:"Trading unit 1250 MMBTU i.e per 1250 MMBTU"
    },
    {
        label:'MCXBULLDEX',
        lotSize: 50,
        basevalueInfo:"Base value MCX iCOMDEX Bullion Index",
        tradingUnitInfo:"Trading unit 50  i.e per 50 units"
    },
    {
        label:'MCXMETLDEX',
        lotSize: 50,
        basevalueInfo:"Base value MCX iCOMDEX Base Metal Index",
        tradingUnitInfo:"Trading unit 50  i.e per 50 units"
    },
    {
        label:'MCXENRGDEX',
        lotSize: 125,
        basevalueInfo:"Base value MCX iCOMDEX ENERGY",
        tradingUnitInfo:"Trading unit 125  i.e per 125 units"
    },
    {
        label:'COPPER',
        lotSize: 2500,
        basevalueInfo:"Base value per Kg. MT (Metric Ton) = 1000 Kilos or 10 Quintals . Quintal = 100 Kgs",
        tradingUnitInfo:"Trading unit 2.5 MT i.e per 2500kgs"
    },
    {
        basevalueInfo:"",
        label:"CUSTOM",
        lotSize:1,
        tradingUnitInfo:""
      },
      {
        basevalueInfo:"Base value per stock unit",
        label:"NIFTY 50 FUT",
        lotSize:50,
        tradingUnitInfo:"Lot Size 50"
      }
];

export class scripObject{
    label:string ="";
    lotSize:number = 0;
    basevalueInfo:string ="";
    tradingUnitInfo:string ="";
};