import { produce } from "immer";
const initialState = {
  productsList: [
    { id: 0, name: 'Camera', subHeader: 'To Capture Your Beautiful Memories', description: `CANON EOS 90D DSLR reflex camera + IS NANO zoom lens 135-18 resolution 33 megapixel | Auto focus + manual `, img: '/images/Camera.png', price: 20 },
    { id: 1, name: '$100,000 In Cash', subHeader: 'To Feel Rich', description: 'You get $100,000 without doing a thing! What will you buy with all those big bucks?', img: '/images/CashPrize.jpg', price: 40 },
    { id: 2, name: 'Cleaning Help', subHeader: 'For A Spotless Home', description: `Cleaning Help for a Year. Double the fun! Receive in addition: 2,000 NIS towards purchase of cleaning products. `, img: '/images/Computer.png', price: 30 },
    { id: 4, name: 'Dream Card', subHeader: 'To Fullfill Your Dreams', description: '5,000 NIS Dream Card', img: '/images/DreamCard.png', price: 20 },
    { id: 5, name: 'Flight To USA', subHeader: 'For Sunshine and Smiles', description: `Two Round Trip Tickets to the US. Double the fun! Receive in addition: $1,000 for shopping. `, img: '/images/FlightToUSA.png', price: 30 },
    { id: 6, name: 'Gas For A Year', subHeader: 'To Go Far', description: `Gas for one year (up to NIS 12,000). The prize includes: Delkan monthly for a year for a total of NIS 12,000. Refuel your car`, img: '/images/GasForAYear.png', price: 40 },
    { id: 7, name: '5,000 to Ikea', subHeader: 'For A Nice Home', description: 'Make your home nice with $5,000 to Ikea.', img: '/images/Ikea.png', price: 20 },
    { id: 8, name: 'Luxury Car', subHeader: 'To Travel In Comfort', description: `NIS 160,000 for a luxury car. This is your chance to choose the perfect minivan or jeep for you.`, img: '/images/LuxuryCar.jpg', price: 60 },
    { id: 9, name: 'Modern Kitchen', subHeader: 'For Pampered Mealtimes', description: `Luxurious 'Inside' Kitchen.  The prize includes: 12 meters of cabinets made of red sandwich wood, `, img: '/images/ModernKitchen.jpg', price: 50 },
    { id: 10, name: '$12,000 In Your Bank ', subHeader: 'To Help You Get Through the Month', description: 'gggggggggggggiiiiiiiiiiii', img: '/images/MoneyInBank.png', price: 30 },
    { id: 11, name: 'Mortage for a Year', subHeader: 'To Help You Save Money', description: `2,500 NIS per month for a year, for mortgage payments, debt repayments or to cover current expenses!`, img: '/images/MortageForYear.png', price: 50 },
    { id: 12, name: 'Nespresso Machine', subHeader: 'For a Morning Jolt', description: `'New generation coffee machine,offering a variety of coffee recipes with one click.  The machine is made `, img: '/images/Nespresso.png', price: 10 },
    { id: 13, name: '$10,000 to Osher Ad', subHeader: 'For a Grocery Shopping Spree', description: `Migdal Hamek: the stadium 10 | Kiryat Bialik: Hans Muller 6 | Jerusalem: Givat Shaul, Beit Hadfus `, img: '/images/OsherAd.png', price: 20 },
    { id: 14, name: 'Sefer Torah', subHeader: 'In Memory of Your Loved Ones', description: `There is nothing more exciting than placing a Torah scroll in memory of your loved one! A mehudar Torah `, img: '/images/SeferTorah.png', price: 60 },
    { id: 15, name: '$10,000 Men Shopping', subHeader: 'For Whatever He Needs', description: `NIS 11,000 men's shopping. The prize includes: 2,000 NIS in 'Bagir', 2,000 NIS at Davis, 2,000 NISin 'Ohr`, img: '/images/ShoppingForMen.png', price: 20 },
    { id: 16, name: 'Ski Trip in Europe', subHeader: 'For Pure Fun', description: `Ski vacation for 2 in Europe. The prize includes: Ski vacation for a couple from Sunday to Thursday, with a total val`, img: '/images/SkiTripInEurope.png', price: 30 },
    { id: 17, name: 'Surprise Prize', subHeader: 'For...', description: `Behind this prize is a sense of curiosity and anticipation that you cannot hide.Ready to contain all this goodness?`, img: '/images/SurprisePrize.png', price: 10 },
    { id: 18, name: 'Two Tickets to Europe', subHeader: 'For a Terrific Tour', description: `Two Round Trip Tickets to Europe. Double the fun! Receive in addition: €500 for shopping. Double flight t`, img: '/images/TripToEurope.png', price: 30 },
    { id: 19, name: 'Two Tickets to Crestir', subHeader: 'For a Day of Heartful Prayers', description: `Two Round Trip Tickets to Crestir. The prize includes: A pair of round trip tickets to Crestir, Tickets must be purchased at least one month before the flight.`, img: '/images/TripToKrastir.png', price: 30 },
    { id: 20, name: 'Wig', subHeader: 'For a Stunning Look', description: `Prize includes: BK wig worth 12,000 NIS + Design by Chavi Weiss`, img: '/images/Wig.png', price: 30 },
    { id: 21, name: 'Diamond Ring', subHeader: 'For a Stunning Look', description: `14K white gold ring 0.75 carat diamond`, img: '/images/DiamondRing.png', price: 20 },
    { id: 22, name: "Bugaboo B6", subHeader: 'For Your Baby', description: '', img: '/images/BugabooStroller.png', price: 20 },
    { id: 23, name: '5,000 NIS For Games', subHeader: 'For Your Sweeties', description: '', img: '/images/GameSet.png', price: 10 }
  ],
  CartList: []
};

export const productsReducer = produce((state, action) => {
  switch (action.type) {
    case "addProduct":
      state.productsList.push(action.payload);
      break;
    case "removeProduct":
      state.productsList = state.productsList.filter((p) => action.payload !== p.id);
      for (let i = action.payload; i < state.productsList.length; i++) {
        state.productsList[i].id--;
      }
      break;
    case "editProduct":
      state.productsList[action.payload.prodId] = action.payload.prod;
      break;
    case "addToCart":
      {
        let i = 0;
        if (state.CartList.length > 0) {
          for (; i < state.CartList.length; i++) {
            if (state.CartList[i].id === action.payload.id) {
              state.CartList[i].amount += 1;
              break;
            }
          }
        }
        if (i === state.CartList.length)
          state.CartList.push(action.payload)
        break;
      }
    case "removeFromCart":
      {

        let i = 0;
        for (; i < state.CartList.length; i++) {
          if (state.CartList[i].id === action.payload) {
            if (state.CartList[i].amount > 1)
              state.CartList[i].amount -= 1;
            else state.CartList=state.CartList.filter((item)=>{return item!==state.CartList[i]})
          }
        }
        break;
      }

  }
}, initialState);
