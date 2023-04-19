export const MilesTo = {
	Feet: (Miles: number) => {
		return Miles * 5280;
	},
	Kilometers: (Miles: number) => {
		return Miles * 1.609;
	},
	Meters: (Miles: number) => {
		return Miles * 1609.344;
	},
	Yard: (Miles: number) => {
		return Miles * 1760;
	},
	Inches: (Miles: number) => {
		return Miles * 63360;
	},
};
export const KilometersTo = {
	Miles: (Kilometers: number) => {
		return Kilometers * 0.621371;
	},
	Meters: (Kilometers: number) => {
		return Kilometers * 1000;
	},
	Centimeters: (Kilometers: number) => {
		return Kilometers * 100000;
	},
	Yard: (Kilometers: number) => {
		return Kilometers * 1093.6132983377;
	},
};
export const InchesTo = {
	Feet: (Inch: number) => {
		return Inch * 0.0833333333;
	},
	Centimeters: (Inch: number) => {
		return Inch * 2.54;
	},
	Meters: (Inch: number) => {
		return Inch * 0.0254;
	},
	Yards: (Inch: number) => {
		return Inch * 0.0277777778;
	},
};
export const FeetTo = {
	Meters: (Feet: number) => {
		return Feet * 0.3048;
	},
	Kilometers: (Feet: number) => {
		return Feet * 0.0003048;
	},
	Yards: (Feet: number) => {
		return Feet * 0.3333333333;
	},
	Centimeters: (Feet: number) => {
		return Feet * 30.48;
	},
	Miles: (Feet: number) => {
		return Feet * 0.0001893939;
	},
};
export const MetersTo = {
	Feet: (Meter: number) => {
		return Meter * 3.280839895;
	},
	Centimeters: (Meter: number) => {
		return Meter * 100;
	},
	Kilometers: (Meter: number) => {
		return Meter * 0.001;
	},
	Yards: (Meter: number) => {
		return Meter * 1.0936132983;
	},
	Miles: (Meter: number) => {
		return Meter * 0.0006213712;
	},
};
export const CentimetersTo = {
	Meters: (Centimeters: number) => {
		return Centimeters * 0.01;
	},
	Inches: (Centimeters: number) => {
		return Centimeters * 0.3937007874;
	},
	Kilometers: (Centimeters: number) => {
		return Centimeters * 1.0e-5;
	},
	Feet: (Centimeters: number) => {
		return Centimeters * 0.032808399;
	},
};
export const FahrenheitTo = {
	Kelvin: (Fahrenheit: number) => {
		return ((Fahrenheit + 459.67) * 5) / 9;
	},
	Celcius: (Fahrenheit: number) => {
		return ((Fahrenheit - 32) * 5) / 9;
	},
	Reaumur: (Fahrenheit: number) => {
		return ((Fahrenheit - 32) * 4) / 9;
	},
	Rankine: (Fahrenheit: number) => {
		return Fahrenheit + 459.67;
	},
};
export const KelvinTo = {
	Celcius: (Kelvin: number) => {
		return Kelvin - 273.15;
	},
	Fahrenheit: (Kelvin: number) => {
		return (Kelvin * 9) / 5 - 459.67;
	},
	Reaumur: (Kelvin: number) => {
		return ((Kelvin - 273.15) * 4) / 5;
	},
	Rankine: (Kelvin: number) => {
		return Kelvin * 1.8;
	},
};
export const CelciusTo = {
	Kelvin: (Celcius: number) => {
		return Celcius + 273.15;
	},
	Fahrenheit: (Celcius: number) => {
		return (Celcius * 9) / 5 + 32;
	},
	Reaumur: (Celcius: number) => {
		return Celcius * 0.8;
	},
	Rankine: (Celcius: number) => {
		return Celcius * 1.8 + 32 + 459.67;
	},
};
export const ReaumurTo = {
	Kelvin: (Reaumur: number) => {
		return Reaumur * 1.25 + 273.15;
	},
	Fahrenheit: (Reaumur: number) => {
		return Reaumur * 2.25 + 32;
	},
	Celcius: (Reaumur: number) => {
		return Reaumur * 1.25;
	},
	Rankine: (Reaumur: number) => {
		return Reaumur * 2.25 + 32 + 459.67;
	},
};
export const RankineTo = {
	Kelvin: (Rankine: number) => {
		return Rankine / 1.8;
	},
	Fahrenheit: (Rankine: number) => {
		return Rankine - 459.67;
	},
	Celcius: (Rankine: number) => {
		return (Rankine - 32 - 459.67) / 1.8;
	},
	Reaumur: (Rankine: number) => {
		return (Rankine - 32 - 459.67) / 2.25;
	},
};
export const GigabytesTo = {
	Bytes: (Gigabytes: number) => {
		return Gigabytes * 1073741824;
	},
	Megabytes: (Gigabytes: number) => {
		return Gigabytes * 1024;
	},
	Terabytes: (Gigabytes: number) => {
		return Gigabytes * 0.0009765625;
	},
	Kilobytes: (Gigabytes: number) => {
		return Gigabytes * 1048576;
	},
};
export const MegabytesTo = {
	Bytes: (Megabytes: number) => {
		return Megabytes * 1048576;
	},
	Gigabytes: (Megabytes: number) => {
		return Megabytes * 0.0009765625;
	},
	Terabytes: (Megabytes: number) => {
		return Megabytes * 9.5367431640625e-7;
	},
	Kilobytes: (Megabytes: number) => {
		return Megabytes * 1024;
	},
};
export const TerabytesTo = {
	Bytes: (Terabytes: number) => {
		return Terabytes * 1099511627776;
	},
	Gigabytes: (Terabytes: number) => {
		return Terabytes * 1024;
	},
	Megabytes: (Terabytes: number) => {
		return Terabytes * 1048576;
	},
	Kilobytes: (Terabytes: number) => {
		return Terabytes * 1073741824;
	},
};
export const BytesTo = {
	Megabytes: (Bytes: number) => {
		return Bytes * 9.5367431640625e-7;
	},
	Gigabytes: (Bytes: number) => {
		return Bytes * 9.3132257461548e-10;
	},
	Terabytes: (Bytes: number) => {
		return Bytes * 9.0949470177293e-13;
	},
	Kilobytes: (Bytes: number) => {
		return Bytes * 0.0009765625;
	},
};
