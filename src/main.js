const finnhub = require("finnhub");
import { createApp } from "vue";
import moshaToast from "mosha-vue-toastify";
import VueApexCharts from "vue3-apexcharts";
import getSymbolFromCurrency from "currency-symbol-map";
import { FinnhubClient } from "./composite/FinnhubClient";
import "mosha-vue-toastify/dist/style.css";
import "./assets/css/index.css";
require("typeface-open-sans");

import App from "./App.vue";

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "sandbox_cb8o7lqad3i0v9a1sk50"; // Replace this

const socketAddress = "wss://ws.finnhub.io?token=cb8o7lqad3i0v9a1sk4g";

const client = new FinnhubClient(new finnhub.DefaultApi()).client;

const app = createApp(App);
app.provide("client", client);
app.provide("socketAddress", socketAddress);
app.provide("getSymbolFromCurrency", getSymbolFromCurrency);
app.use(moshaToast);
app.use(VueApexCharts);
app.mount("#app");
