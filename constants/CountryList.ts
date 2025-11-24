const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia (Czech Republic)",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini (fmr. Swaziland)",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Holy See",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea (North)",
  "Korea (South)",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (formerly Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia (formerly Macedonia)",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine State",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export const countriesWithFlags = [
  {
    value: "1",
    label: "Andorra",
    image: {
      uri: "https://flagsapi.com/AD/flat/64.png",
    },
  },
  {
    value: "2",
    label: "United Arab Emirates",
    image: {
      uri: "https://flagsapi.com/AE/flat/64.png",
    },
  },
  {
    value: "3",
    label: "Afghanistan",
    image: {
      uri: "https://flagsapi.com/AF/flat/64.png",
    },
  },
  {
    value: "4",
    label: "Antigua and Barbuda",
    image: {
      uri: "https://flagsapi.com/AG/flat/64.png",
    },
  },
  {
    value: "5",
    label: "Anguilla",
    image: {
      uri: "https://flagsapi.com/AI/flat/64.png",
    },
  },
  {
    value: "6",
    label: "Albania",
    image: {
      uri: "https://flagsapi.com/AL/flat/64.png",
    },
  },
  {
    value: "7",
    label: "Armenia",
    image: {
      uri: "https://flagsapi.com/AM/flat/64.png",
    },
  },
  {
    value: "8",
    label: "Netherlands Antilles",
    image: {
      uri: "https://flagsapi.com/AN/flat/64.png",
    },
  },
  {
    value: "9",
    label: "Angola",
    image: {
      uri: "https://flagsapi.com/AO/flat/64.png",
    },
  },
  {
    value: "10",
    label: "Antarctica",
    image: {
      uri: "https://flagsapi.com/AQ/flat/64.png",
    },
  },
  {
    value: "11",
    label: "Argentina",
    image: {
      uri: "https://flagsapi.com/AR/flat/64.png",
    },
  },
  {
    value: "12",
    label: "American Samoa",
    image: {
      uri: "https://flagsapi.com/AS/flat/64.png",
    },
  },
  {
    value: "13",
    label: "Austria",
    image: {
      uri: "https://flagsapi.com/AT/flat/64.png",
    },
  },
  {
    value: "14",
    label: "Australia",
    image: {
      uri: "https://flagsapi.com/AU/flat/64.png",
    },
  },
  {
    value: "15",
    label: "Aruba",
    image: {
      uri: "https://flagsapi.com/AW/flat/64.png",
    },
  },
  {
    value: "16",
    label: "Åland Islands",
    image: {
      uri: "https://flagsapi.com/AX/flat/64.png",
    },
  },
  {
    value: "17",
    label: "Azerbaijan",
    image: {
      uri: "https://flagsapi.com/AZ/flat/64.png",
    },
  },
  {
    value: "18",
    label: "Bosnia and Herzegovina",
    image: {
      uri: "https://flagsapi.com/BA/flat/64.png",
    },
  },
  {
    value: "19",
    label: "Barbados",
    image: {
      uri: "https://flagsapi.com/BB/flat/64.png",
    },
  },
  {
    value: "20",
    label: "Bangladesh",
    image: {
      uri: "https://flagsapi.com/BD/flat/64.png",
    },
  },
  {
    value: "21",
    label: "Belgium",
    image: {
      uri: "https://flagsapi.com/BE/flat/64.png",
    },
  },
  {
    value: "22",
    label: "Burkina Faso",
    image: {
      uri: "https://flagsapi.com/BF/flat/64.png",
    },
  },
  {
    value: "23",
    label: "Bulgaria",
    image: {
      uri: "https://flagsapi.com/BG/flat/64.png",
    },
  },
  {
    value: "24",
    label: "Bahrain",
    image: {
      uri: "https://flagsapi.com/BH/flat/64.png",
    },
  },
  {
    value: "25",
    label: "Burundi",
    image: {
      uri: "https://flagsapi.com/BI/flat/64.png",
    },
  },
  {
    value: "26",
    label: "Benin",
    image: {
      uri: "https://flagsapi.com/BJ/flat/64.png",
    },
  },
  {
    value: "27",
    label: "Saint Barthélemy",
    image: {
      uri: "https://flagsapi.com/BL/flat/64.png",
    },
  },
  {
    value: "28",
    label: "Bermuda",
    image: {
      uri: "https://flagsapi.com/BM/flat/64.png",
    },
  },
  {
    value: "29",
    label: "Brunei Darussalam",
    image: {
      uri: "https://flagsapi.com/BN/flat/64.png",
    },
  },
  {
    value: "30",
    label: "Bolivia",
    image: {
      uri: "https://flagsapi.com/BO/flat/64.png",
    },
  },
  {
    value: "31",
    label: "Bonaire, Sint Eustatius and Saba",
    image: {
      uri: "https://flagsapi.com/BQ/flat/64.png",
    },
  },
  {
    value: "32",
    label: "Brazil",
    image: {
      uri: "https://flagsapi.com/BR/flat/64.png",
    },
  },
  {
    value: "33",
    label: "Bahamas",
    image: {
      uri: "https://flagsapi.com/BS/flat/64.png",
    },
  },
  {
    value: "34",
    label: "Bhutan",
    image: {
      uri: "https://flagsapi.com/BT/flat/64.png",
    },
  },
  {
    value: "35",
    label: "Bouvet Island",
    image: {
      uri: "https://flagsapi.com/BV/flat/64.png",
    },
  },
  {
    value: "36",
    label: "Botswana",
    image: {
      uri: "https://flagsapi.com/BW/flat/64.png",
    },
  },
  {
    value: "37",
    label: "Belarus",
    image: {
      uri: "https://flagsapi.com/BY/flat/64.png",
    },
  },
  {
    value: "38",
    label: "Belize",
    image: {
      uri: "https://flagsapi.com/BZ/flat/64.png",
    },
  },
  {
    value: "39",
    label: "Canada",
    image: {
      uri: "https://flagsapi.com/CA/flat/64.png",
    },
  },
  {
    value: "40",
    label: "Cocos (Keeling) Islands",
    image: {
      uri: "https://flagsapi.com/CC/flat/64.png",
    },
  },
  {
    value: "41",
    label: "Congo, The Democratic Republic Of The",
    image: {
      uri: "https://flagsapi.com/CD/flat/64.png",
    },
  },
  {
    value: "42",
    label: "Central African Republic",
    image: {
      uri: "https://flagsapi.com/CF/flat/64.png",
    },
  },
  {
    value: "43",
    label: "Congo",
    image: {
      uri: "https://flagsapi.com/CG/flat/64.png",
    },
  },
  {
    value: "44",
    label: "Switzerland",
    image: {
      uri: "https://flagsapi.com/CH/flat/64.png",
    },
  },
  {
    value: "45",
    label: "Côte D'Ivoire",
    image: {
      uri: "https://flagsapi.com/CI/flat/64.png",
    },
  },
  {
    value: "46",
    label: "Cook Islands",
    image: {
      uri: "https://flagsapi.com/CK/flat/64.png",
    },
  },
  {
    value: "47",
    label: "Chile",
    image: {
      uri: "https://flagsapi.com/CL/flat/64.png",
    },
  },
  {
    value: "48",
    label: "Cameroon",
    image: {
      uri: "https://flagsapi.com/CM/flat/64.png",
    },
  },
  {
    value: "49",
    label: "China",
    image: {
      uri: "https://flagsapi.com/CN/flat/64.png",
    },
  },
  {
    value: "50",
    label: "Colombia",
    image: {
      uri: "https://flagsapi.com/CO/flat/64.png",
    },
  },
  {
    value: "51",
    label: "Costa Rica",
    image: {
      uri: "https://flagsapi.com/CR/flat/64.png",
    },
  },
  {
    value: "52",
    label: "Cuba",
    image: {
      uri: "https://flagsapi.com/CU/flat/64.png",
    },
  },
  {
    value: "53",
    label: "Cape Verde",
    image: {
      uri: "https://flagsapi.com/CV/flat/64.png",
    },
  },
  {
    value: "54",
    label: "Curaçao",
    image: {
      uri: "https://flagsapi.com/CW/flat/64.png",
    },
  },
  {
    value: "55",
    label: "Christmas Island",
    image: {
      uri: "https://flagsapi.com/CX/flat/64.png",
    },
  },
  {
    value: "56",
    label: "Cyprus",
    image: {
      uri: "https://flagsapi.com/CY/flat/64.png",
    },
  },
  {
    value: "57",
    label: "Czech Republic",
    image: {
      uri: "https://flagsapi.com/CZ/flat/64.png",
    },
  },
  {
    value: "58",
    label: "Germany",
    image: {
      uri: "https://flagsapi.com/DE/flat/64.png",
    },
  },
  {
    value: "59",
    label: "Djibouti",
    image: {
      uri: "https://flagsapi.com/DJ/flat/64.png",
    },
  },
  {
    value: "60",
    label: "Denmark",
    image: {
      uri: "https://flagsapi.com/DK/flat/64.png",
    },
  },
  {
    value: "61",
    label: "Dominica",
    image: {
      uri: "https://flagsapi.com/DM/flat/64.png",
    },
  },
  {
    value: "62",
    label: "Dominican Republic",
    image: {
      uri: "https://flagsapi.com/DO/flat/64.png",
    },
  },
  {
    value: "63",
    label: "Algeria",
    image: {
      uri: "https://flagsapi.com/DZ/flat/64.png",
    },
  },
  {
    value: "64",
    label: "Ecuador",
    image: {
      uri: "https://flagsapi.com/EC/flat/64.png",
    },
  },
  {
    value: "65",
    label: "Estonia",
    image: {
      uri: "https://flagsapi.com/EE/flat/64.png",
    },
  },
  {
    value: "66",
    label: "Egypt",
    image: {
      uri: "https://flagsapi.com/EG/flat/64.png",
    },
  },
  {
    value: "67",
    label: "Western Sahara",
    image: {
      uri: "https://flagsapi.com/EH/flat/64.png",
    },
  },
  {
    value: "68",
    label: "Eritrea",
    image: {
      uri: "https://flagsapi.com/ER/flat/64.png",
    },
  },
  {
    value: "69",
    label: "Spain",
    image: {
      uri: "https://flagsapi.com/ES/flat/64.png",
    },
  },
  {
    value: "70",
    label: "Ethiopia",
    image: {
      uri: "https://flagsapi.com/ET/flat/64.png",
    },
  },
  {
    value: "71",
    label: "Finland",
    image: {
      uri: "https://flagsapi.com/FI/flat/64.png",
    },
  },
  {
    value: "72",
    label: "Fiji",
    image: {
      uri: "https://flagsapi.com/FJ/flat/64.png",
    },
  },
  {
    value: "73",
    label: "Falkland Islands (Malvinas)",
    image: {
      uri: "https://flagsapi.com/FK/flat/64.png",
    },
  },
  {
    value: "74",
    label: "Micronesia, Federated States Of",
    image: {
      uri: "https://flagsapi.com/FM/flat/64.png",
    },
  },
  {
    value: "75",
    label: "Faroe Islands",
    image: {
      uri: "https://flagsapi.com/FO/flat/64.png",
    },
  },
  {
    value: "76",
    label: "France",
    image: {
      uri: "https://flagsapi.com/FR/flat/64.png",
    },
  },
  {
    value: "77",
    label: "Gabon",
    image: {
      uri: "https://flagsapi.com/GA/flat/64.png",
    },
  },
  {
    value: "78",
    label: "United Kingdom",
    image: {
      uri: "https://flagsapi.com/GB/flat/64.png",
    },
  },
  {
    value: "79",
    label: "Grenada",
    image: {
      uri: "https://flagsapi.com/GD/flat/64.png",
    },
  },
  {
    value: "80",
    label: "Georgia",
    image: {
      uri: "https://flagsapi.com/GE/flat/64.png",
    },
  },
  {
    value: "81",
    label: "French Guiana",
    image: {
      uri: "https://flagsapi.com/GF/flat/64.png",
    },
  },
  {
    value: "82",
    label: "Guernsey",
    image: {
      uri: "https://flagsapi.com/GG/flat/64.png",
    },
  },
  {
    value: "83",
    label: "Ghana",
    image: {
      uri: "https://flagsapi.com/GH/flat/64.png",
    },
  },
  {
    value: "84",
    label: "Gibraltar",
    image: {
      uri: "https://flagsapi.com/GI/flat/64.png",
    },
  },
  {
    value: "85",
    label: "Greenland",
    image: {
      uri: "https://flagsapi.com/GL/flat/64.png",
    },
  },
  {
    value: "86",
    label: "Gambia",
    image: {
      uri: "https://flagsapi.com/GM/flat/64.png",
    },
  },
  {
    value: "87",
    label: "Guinea",
    image: {
      uri: "https://flagsapi.com/GN/flat/64.png",
    },
  },
  {
    value: "88",
    label: "Guadeloupe",
    image: {
      uri: "https://flagsapi.com/GP/flat/64.png",
    },
  },
  {
    value: "89",
    label: "Equatorial Guinea",
    image: {
      uri: "https://flagsapi.com/GQ/flat/64.png",
    },
  },
  {
    value: "90",
    label: "Greece",
    image: {
      uri: "https://flagsapi.com/GR/flat/64.png",
    },
  },
  {
    value: "91",
    label: "South Georgia and the South Sandwich Islands",
    image: {
      uri: "https://flagsapi.com/GS/flat/64.png",
    },
  },
  {
    value: "92",
    label: "Guatemala",
    image: {
      uri: "https://flagsapi.com/GT/flat/64.png",
    },
  },
  {
    value: "93",
    label: "Guam",
    image: {
      uri: "https://flagsapi.com/GU/flat/64.png",
    },
  },
  {
    value: "94",
    label: "Guinea-Bissau",
    image: {
      uri: "https://flagsapi.com/GW/flat/64.png",
    },
  },
  {
    value: "95",
    label: "Guyana",
    image: {
      uri: "https://flagsapi.com/GY/flat/64.png",
    },
  },
  {
    value: "96",
    label: "Hong Kong",
    image: {
      uri: "https://flagsapi.com/HK/flat/64.png",
    },
  },
  {
    value: "97",
    label: "Heard and McDonald Islands",
    image: {
      uri: "https://flagsapi.com/HM/flat/64.png",
    },
  },
  {
    value: "98",
    label: "Honduras",
    image: {
      uri: "https://flagsapi.com/HN/flat/64.png",
    },
  },
  {
    value: "99",
    label: "Croatia",
    image: {
      uri: "https://flagsapi.com/HR/flat/64.png",
    },
  },
  {
    value: "100",
    label: "Haiti",
    image: {
      uri: "https://flagsapi.com/HT/flat/64.png",
    },
  },
  {
    value: "101",
    label: "Hungary",
    image: {
      uri: "https://flagsapi.com/HU/flat/64.png",
    },
  },
  {
    value: "102",
    label: "Indonesia",
    image: {
      uri: "https://flagsapi.com/ID/flat/64.png",
    },
  },
  {
    value: "103",
    label: "Ireland",
    image: {
      uri: "https://flagsapi.com/IE/flat/64.png",
    },
  },
  {
    value: "104",
    label: "Israel",
    image: {
      uri: "https://flagsapi.com/IL/flat/64.png",
    },
  },
  {
    value: "105",
    label: "Isle of Man",
    image: {
      uri: "https://flagsapi.com/IM/flat/64.png",
    },
  },
  {
    value: "106",
    label: "India",
    image: {
      uri: "https://flagsapi.com/IN/flat/64.png",
    },
  },
  {
    value: "107",
    label: "British Indian Ocean Territory",
    image: {
      uri: "https://flagsapi.com/IO/flat/64.png",
    },
  },
  {
    value: "108",
    label: "Iraq",
    image: {
      uri: "https://flagsapi.com/IQ/flat/64.png",
    },
  },
  {
    value: "109",
    label: "Iran, Islamic Republic Of",
    image: {
      uri: "https://flagsapi.com/IR/flat/64.png",
    },
  },
  {
    value: "110",
    label: "Iceland",
    image: {
      uri: "https://flagsapi.com/IS/flat/64.png",
    },
  },
  {
    value: "111",
    label: "Italy",
    image: {
      uri: "https://flagsapi.com/IT/flat/64.png",
    },
  },
  {
    value: "112",
    label: "Jersey",
    image: {
      uri: "https://flagsapi.com/JE/flat/64.png",
    },
  },
  {
    value: "113",
    label: "Jamaica",
    image: {
      uri: "https://flagsapi.com/JM/flat/64.png",
    },
  },
  {
    value: "114",
    label: "Jordan",
    image: {
      uri: "https://flagsapi.com/JO/flat/64.png",
    },
  },
  {
    value: "115",
    label: "Japan",
    image: {
      uri: "https://flagsapi.com/JP/flat/64.png",
    },
  },
  {
    value: "116",
    label: "Kenya",
    image: {
      uri: "https://flagsapi.com/KE/flat/64.png",
    },
  },
  {
    value: "117",
    label: "Kyrgyzstan",
    image: {
      uri: "https://flagsapi.com/KG/flat/64.png",
    },
  },
  {
    value: "118",
    label: "Cambodia",
    image: {
      uri: "https://flagsapi.com/KH/flat/64.png",
    },
  },
  {
    value: "119",
    label: "Kiribati",
    image: {
      uri: "https://flagsapi.com/KI/flat/64.png",
    },
  },
  {
    value: "120",
    label: "Comoros",
    image: {
      uri: "https://flagsapi.com/KM/flat/64.png",
    },
  },
  {
    value: "121",
    label: "Saint Kitts And Nevis",
    image: {
      uri: "https://flagsapi.com/KN/flat/64.png",
    },
  },
  {
    value: "122",
    label: "Korea, Democratic People's Republic Of",
    image: {
      uri: "https://flagsapi.com/KP/flat/64.png",
    },
  },
  {
    value: "123",
    label: "Korea, Republic of",
    image: {
      uri: "https://flagsapi.com/KR/flat/64.png",
    },
  },
  {
    value: "124",
    label: "Kuwait",
    image: {
      uri: "https://flagsapi.com/KW/flat/64.png",
    },
  },
  {
    value: "125",
    label: "Cayman Islands",
    image: {
      uri: "https://flagsapi.com/KY/flat/64.png",
    },
  },
  {
    value: "126",
    label: "Kazakhstan",
    image: {
      uri: "https://flagsapi.com/KZ/flat/64.png",
    },
  },
  {
    value: "127",
    label: "Lao People's Democratic Republic",
    image: {
      uri: "https://flagsapi.com/LA/flat/64.png",
    },
  },
  {
    value: "128",
    label: "Lebanon",
    image: {
      uri: "https://flagsapi.com/LB/flat/64.png",
    },
  },
  {
    value: "129",
    label: "Saint Lucia",
    image: {
      uri: "https://flagsapi.com/LC/flat/64.png",
    },
  },
  {
    value: "130",
    label: "Liechtenstein",
    image: {
      uri: "https://flagsapi.com/LI/flat/64.png",
    },
  },
  {
    value: "131",
    label: "Sri Lanka",
    image: {
      uri: "https://flagsapi.com/LK/flat/64.png",
    },
  },
  {
    value: "132",
    label: "Liberia",
    image: {
      uri: "https://flagsapi.com/LR/flat/64.png",
    },
  },
  {
    value: "133",
    label: "Lesotho",
    image: {
      uri: "https://flagsapi.com/LS/flat/64.png",
    },
  },
  {
    value: "134",
    label: "Lithuania",
    image: {
      uri: "https://flagsapi.com/LT/flat/64.png",
    },
  },
  {
    value: "135",
    label: "Luxembourg",
    image: {
      uri: "https://flagsapi.com/LU/flat/64.png",
    },
  },
  {
    value: "136",
    label: "Latvia",
    image: {
      uri: "https://flagsapi.com/LV/flat/64.png",
    },
  },
  {
    value: "137",
    label: "Libya",
    image: {
      uri: "https://flagsapi.com/LY/flat/64.png",
    },
  },
  {
    value: "138",
    label: "Morocco",
    image: {
      uri: "https://flagsapi.com/MA/flat/64.png",
    },
  },
  {
    value: "139",
    label: "Monaco",
    image: {
      uri: "https://flagsapi.com/MC/flat/64.png",
    },
  },
  {
    value: "140",
    label: "Moldova, Republic of",
    image: {
      uri: "https://flagsapi.com/MD/flat/64.png",
    },
  },
  {
    value: "141",
    label: "Montenegro",
    image: {
      uri: "https://flagsapi.com/ME/flat/64.png",
    },
  },
  {
    value: "142",
    label: "Saint Martin",
    image: {
      uri: "https://flagsapi.com/MF/flat/64.png",
    },
  },
  {
    value: "143",
    label: "Madagascar",
    image: {
      uri: "https://flagsapi.com/MG/flat/64.png",
    },
  },
  {
    value: "144",
    label: "Marshall Islands",
    image: {
      uri: "https://flagsapi.com/MH/flat/64.png",
    },
  },
  {
    value: "145",
    label: "Macedonia, the Former Yugoslav Republic Of",
    image: {
      uri: "https://flagsapi.com/MK/flat/64.png",
    },
  },
  {
    value: "146",
    label: "Mali",
    image: {
      uri: "https://flagsapi.com/ML/flat/64.png",
    },
  },
  {
    value: "147",
    label: "Myanmar",
    image: {
      uri: "https://flagsapi.com/MM/flat/64.png",
    },
  },
  {
    value: "148",
    label: "Mongolia",
    image: {
      uri: "https://flagsapi.com/MN/flat/64.png",
    },
  },
  {
    value: "149",
    label: "Macao",
    image: {
      uri: "https://flagsapi.com/MO/flat/64.png",
    },
  },
  {
    value: "150",
    label: "Northern Mariana Islands",
    image: {
      uri: "https://flagsapi.com/MP/flat/64.png",
    },
  },
  {
    value: "151",
    label: "Martinique",
    image: {
      uri: "https://flagsapi.com/MQ/flat/64.png",
    },
  },
  {
    value: "152",
    label: "Mauritania",
    image: {
      uri: "https://flagsapi.com/MR/flat/64.png",
    },
  },
  {
    value: "153",
    label: "Montserrat",
    image: {
      uri: "https://flagsapi.com/MS/flat/64.png",
    },
  },
  {
    value: "154",
    label: "Malta",
    image: {
      uri: "https://flagsapi.com/MT/flat/64.png",
    },
  },
  {
    value: "155",
    label: "Mauritius",
    image: {
      uri: "https://flagsapi.com/MU/flat/64.png",
    },
  },
  {
    value: "156",
    label: "Maldives",
    image: {
      uri: "https://flagsapi.com/MV/flat/64.png",
    },
  },
  {
    value: "157",
    label: "Malawi",
    image: {
      uri: "https://flagsapi.com/MW/flat/64.png",
    },
  },
  {
    value: "158",
    label: "Mexico",
    image: {
      uri: "https://flagsapi.com/MX/flat/64.png",
    },
  },
  {
    value: "159",
    label: "Malaysia",
    image: {
      uri: "https://flagsapi.com/MY/flat/64.png",
    },
  },
  {
    value: "160",
    label: "Mozambique",
    image: {
      uri: "https://flagsapi.com/MZ/flat/64.png",
    },
  },
  {
    value: "161",
    label: "Namibia",
    image: {
      uri: "https://flagsapi.com/NA/flat/64.png",
    },
  },
  {
    value: "162",
    label: "New Caledonia",
    image: {
      uri: "https://flagsapi.com/NC/flat/64.png",
    },
  },
  {
    value: "163",
    label: "Niger",
    image: {
      uri: "https://flagsapi.com/NE/flat/64.png",
    },
  },
  {
    value: "164",
    label: "Norfolk Island",
    image: {
      uri: "https://flagsapi.com/NF/flat/64.png",
    },
  },
  {
    value: "165",
    label: "Nigeria",
    image: {
      uri: "https://flagsapi.com/NG/flat/64.png",
    },
  },
  {
    value: "166",
    label: "Nicaragua",
    image: {
      uri: "https://flagsapi.com/NI/flat/64.png",
    },
  },
  {
    value: "167",
    label: "Netherlands",
    image: {
      uri: "https://flagsapi.com/NL/flat/64.png",
    },
  },
  {
    value: "168",
    label: "Norway",
    image: {
      uri: "https://flagsapi.com/NO/flat/64.png",
    },
  },
  {
    value: "169",
    label: "Nepal",
    image: {
      uri: "https://flagsapi.com/NP/flat/64.png",
    },
  },
  {
    value: "170",
    label: "Nauru",
    image: {
      uri: "https://flagsapi.com/NR/flat/64.png",
    },
  },
  {
    value: "171",
    label: "Niue",
    image: {
      uri: "https://flagsapi.com/NU/flat/64.png",
    },
  },
  {
    value: "172",
    label: "New Zealand",
    image: {
      uri: "https://flagsapi.com/NZ/flat/64.png",
    },
  },
  {
    value: "173",
    label: "Oman",
    image: {
      uri: "https://flagsapi.com/OM/flat/64.png",
    },
  },
  {
    value: "174",
    label: "Panama",
    image: {
      uri: "https://flagsapi.com/PA/flat/64.png",
    },
  },
  {
    value: "175",
    label: "Peru",
    image: {
      uri: "https://flagsapi.com/PE/flat/64.png",
    },
  },
  {
    value: "176",
    label: "French Polynesia",
    image: {
      uri: "https://flagsapi.com/PF/flat/64.png",
    },
  },
  {
    value: "177",
    label: "Papua New Guinea",
    image: {
      uri: "https://flagsapi.com/PG/flat/64.png",
    },
  },
  {
    value: "178",
    label: "Philippines",
    image: {
      uri: "https://flagsapi.com/PH/flat/64.png",
    },
  },
  {
    value: "179",
    label: "Pakistan",
    image: {
      uri: "https://flagsapi.com/PK/flat/64.png",
    },
  },
  {
    value: "180",
    label: "Poland",
    image: {
      uri: "https://flagsapi.com/PL/flat/64.png",
    },
  },
  {
    value: "181",
    label: "Saint Pierre And Miquelon",
    image: {
      uri: "https://flagsapi.com/PM/flat/64.png",
    },
  },
  {
    value: "182",
    label: "Pitcairn",
    image: {
      uri: "https://flagsapi.com/PN/flat/64.png",
    },
  },
  {
    value: "183",
    label: "Puerto Rico",
    image: {
      uri: "https://flagsapi.com/PR/flat/64.png",
    },
  },
  {
    value: "184",
    label: "Palestine, State of",
    image: {
      uri: "https://flagsapi.com/PS/flat/64.png",
    },
  },
  {
    value: "185",
    label: "Portugal",
    image: {
      uri: "https://flagsapi.com/PT/flat/64.png",
    },
  },
  {
    value: "186",
    label: "Palau",
    image: {
      uri: "https://flagsapi.com/PW/flat/64.png",
    },
  },
  {
    value: "187",
    label: "Paraguay",
    image: {
      uri: "https://flagsapi.com/PY/flat/64.png",
    },
  },
  {
    value: "188",
    label: "Qatar",
    image: {
      uri: "https://flagsapi.com/QA/flat/64.png",
    },
  },
  {
    value: "189",
    label: "Réunion",
    image: {
      uri: "https://flagsapi.com/RE/flat/64.png",
    },
  },
  {
    value: "190",
    label: "Romania",
    image: {
      uri: "https://flagsapi.com/RO/flat/64.png",
    },
  },
  {
    value: "191",
    label: "Serbia",
    image: {
      uri: "https://flagsapi.com/RS/flat/64.png",
    },
  },
  {
    value: "192",
    label: "Russian Federation",
    image: {
      uri: "https://flagsapi.com/RU/flat/64.png",
    },
  },
  {
    value: "193",
    label: "Rwanda",
    image: {
      uri: "https://flagsapi.com/RW/flat/64.png",
    },
  },
  {
    value: "194",
    label: "Saudi Arabia",
    image: {
      uri: "https://flagsapi.com/SA/flat/64.png",
    },
  },
  {
    value: "195",
    label: "Solomon Islands",
    image: {
      uri: "https://flagsapi.com/SB/flat/64.png",
    },
  },
  {
    value: "196",
    label: "Seychelles",
    image: {
      uri: "https://flagsapi.com/SC/flat/64.png",
    },
  },
  {
    value: "197",
    label: "Sudan",
    image: {
      uri: "https://flagsapi.com/SD/flat/64.png",
    },
  },
  {
    value: "198",
    label: "Sweden",
    image: {
      uri: "https://flagsapi.com/SE/flat/64.png",
    },
  },
  {
    value: "199",
    label: "Singapore",
    image: {
      uri: "https://flagsapi.com/SG/flat/64.png",
    },
  },
  {
    value: "200",
    label: "Saint Helena",
    image: {
      uri: "https://flagsapi.com/SH/flat/64.png",
    },
  },
  {
    value: "201",
    label: "Slovenia",
    image: {
      uri: "https://flagsapi.com/SI/flat/64.png",
    },
  },
  {
    value: "202",
    label: "Svalbard And Jan Mayen",
    image: {
      uri: "https://flagsapi.com/SJ/flat/64.png",
    },
  },
  {
    value: "203",
    label: "Slovakia",
    image: {
      uri: "https://flagsapi.com/SK/flat/64.png",
    },
  },
  {
    value: "204",
    label: "Sierra Leone",
    image: {
      uri: "https://flagsapi.com/SL/flat/64.png",
    },
  },
  {
    value: "205",
    label: "San Marino",
    image: {
      uri: "https://flagsapi.com/SM/flat/64.png",
    },
  },
  {
    value: "206",
    label: "Senegal",
    image: {
      uri: "https://flagsapi.com/SN/flat/64.png",
    },
  },
  {
    value: "207",
    label: "Somalia",
    image: {
      uri: "https://flagsapi.com/SO/flat/64.png",
    },
  },
  {
    value: "208",
    label: "Suriname",
    image: {
      uri: "https://flagsapi.com/SR/flat/64.png",
    },
  },
  {
    value: "209",
    label: "South Sudan",
    image: {
      uri: "https://flagsapi.com/SS/flat/64.png",
    },
  },
  {
    value: "210",
    label: "Sao Tome and Principe",
    image: {
      uri: "https://flagsapi.com/ST/flat/64.png",
    },
  },
  {
    value: "211",
    label: "El Salvador",
    image: {
      uri: "https://flagsapi.com/SV/flat/64.png",
    },
  },
  {
    value: "212",
    label: "Sint Maarten",
    image: {
      uri: "https://flagsapi.com/SX/flat/64.png",
    },
  },
  {
    value: "213",
    label: "Syrian Arab Republic",
    image: {
      uri: "https://flagsapi.com/SY/flat/64.png",
    },
  },
  {
    value: "214",
    label: "Swaziland",
    image: {
      uri: "https://flagsapi.com/SZ/flat/64.png",
    },
  },
  {
    value: "215",
    label: "Turks and Caicos Islands",
    image: {
      uri: "https://flagsapi.com/TC/flat/64.png",
    },
  },
  {
    value: "216",
    label: "Chad",
    image: {
      uri: "https://flagsapi.com/TD/flat/64.png",
    },
  },
  {
    value: "217",
    label: "French Southern Territories",
    image: {
      uri: "https://flagsapi.com/TF/flat/64.png",
    },
  },
  {
    value: "218",
    label: "Togo",
    image: {
      uri: "https://flagsapi.com/TG/flat/64.png",
    },
  },
  {
    value: "219",
    label: "Thailand",
    image: {
      uri: "https://flagsapi.com/TH/flat/64.png",
    },
  },
  {
    value: "220",
    label: "Tajikistan",
    image: {
      uri: "https://flagsapi.com/TJ/flat/64.png",
    },
  },
  {
    value: "221",
    label: "Tokelau",
    image: {
      uri: "https://flagsapi.com/TK/flat/64.png",
    },
  },
  {
    value: "222",
    label: "Timor-Leste",
    image: {
      uri: "https://flagsapi.com/TL/flat/64.png",
    },
  },
  {
    value: "223",
    label: "Turkmenistan",
    image: {
      uri: "https://flagsapi.com/TM/flat/64.png",
    },
  },
  {
    value: "224",
    label: "Tunisia",
    image: {
      uri: "https://flagsapi.com/TN/flat/64.png",
    },
  },
  {
    value: "225",
    label: "Tonga",
    image: {
      uri: "https://flagsapi.com/TO/flat/64.png",
    },
  },
  {
    value: "226",
    label: "Turkey",
    image: {
      uri: "https://flagsapi.com/TR/flat/64.png",
    },
  },
  {
    value: "227",
    label: "Trinidad and Tobago",
    image: {
      uri: "https://flagsapi.com/TT/flat/64.png",
    },
  },
  {
    value: "228",
    label: "Tuvalu",
    image: {
      uri: "https://flagsapi.com/TV/flat/64.png",
    },
  },
  {
    value: "229",
    label: "Taiwan, Republic Of China",
    image: {
      uri: "https://flagsapi.com/TW/flat/64.png",
    },
  },
  {
    value: "230",
    label: "Tanzania, United Republic of",
    image: {
      uri: "https://flagsapi.com/TZ/flat/64.png",
    },
  },
  {
    value: "231",
    label: "Ukraine",
    image: {
      uri: "https://flagsapi.com/UA/flat/64.png",
    },
  },
  {
    value: "232",
    label: "Uganda",
    image: {
      uri: "https://flagsapi.com/UG/flat/64.png",
    },
  },
  {
    value: "233",
    label: "United States Minor Outlying Islands",
    image: {
      uri: "https://flagsapi.com/UM/flat/64.png",
    },
  },
  {
    value: "234",
    label: "United States",
    image: {
      uri: "https://flagsapi.com/US/flat/64.png",
    },
  },
  {
    value: "235",
    label: "Uruguay",
    image: {
      uri: "https://flagsapi.com/UY/flat/64.png",
    },
  },
  {
    value: "236",
    label: "Uzbekistan",
    image: {
      uri: "https://flagsapi.com/UZ/flat/64.png",
    },
  },
  {
    value: "237",
    label: "Holy See (Vatican City State)",
    image: {
      uri: "https://flagsapi.com/VA/flat/64.png",
    },
  },
  {
    value: "238",
    label: "Venezuela",
    image: {
      uri: "https://flagsapi.com/VE/flat/64.png",
    },
  },
  {
    value: "239",
    label: "Virgin Islands, British",
    image: {
      uri: "https://flagsapi.com/VG/flat/64.png",
    },
  },
  {
    value: "240",
    label: "Virgin Islands, U.S.",
    image: {
      uri: "https://flagsapi.com/VI/flat/64.png",
    },
  },
  {
    value: "241",
    label: "Vietnam",
    image: {
      uri: "https://flagsapi.com/VN/flat/64.png",
    },
  },
  {
    value: "242",
    label: "Vanuatu",
    image: {
      uri: "https://flagsapi.com/VU/flat/64.png",
    },
  },
  {
    value: "243",
    label: "Wallis and Futuna",
    image: {
      uri: "https://flagsapi.com/WF/flat/64.png",
    },
  },
  {
    value: "244",
    label: "Samoa",
    image: {
      uri: "https://flagsapi.com/WS/flat/64.png",
    },
  },
  {
    value: "245",
    label: "XK",
    image: {
      uri: "https://flagsapi.com/XK/flat/64.png",
    },
  },
  {
    value: "246",
    label: "Yemen",
    image: {
      uri: "https://flagsapi.com/YE/flat/64.png",
    },
  },
  {
    value: "247",
    label: "Mayotte",
    image: {
      uri: "https://flagsapi.com/YT/flat/64.png",
    },
  },
  {
    value: "248",
    label: "South Africa",
    image: {
      uri: "https://flagsapi.com/ZA/flat/64.png",
    },
  },
  {
    value: "249",
    label: "Zambia",
    image: {
      uri: "https://flagsapi.com/ZM/flat/64.png",
    },
  },
  {
    value: "250",
    label: "Zimbabwe",
    image: {
      uri: "https://flagsapi.com/ZW/flat/64.png",
    },
  },
];

export default countries;
