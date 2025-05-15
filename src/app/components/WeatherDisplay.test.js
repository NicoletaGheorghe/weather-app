import { getIcon } from './WeatherDisplay';
 
describe("getIcon Function", () => {
    test("it returns Clear sky for code 0", () => {
        expect(getIcon(0)).toEqual({label: "Clear sky", icon: "/icons/sun.png"});
   

}) })