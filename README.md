# 🌤️ Weather Now - A React Native Weather App

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%233178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)
![OpenWeather](https://img.shields.io/badge/OpenWeather-FF6E01?style=for-the-badge&logo=openweathermap&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

A sleek and modern **React Native Weather App** that displays real-time weather data with a clean, intuitive, and beautifully designed UI. Built with a focus on performance and aesthetics using **TypeScript**, and the **OpenWeather API**.

---

## ✨ Features

- ✅ **Real-time Weather Data:** Instantly access current temperature, weather conditions (like "Mist" or "Partly cloudy"), wind speed, humidity, and sunrise times.
- ✅ **Seamless City Search:** A user-friendly search bar provides live location suggestions as you type, making it easy to find any city worldwide.
- ✅ **Dynamic UI & Icons:** The background gradient and weather icons dynamically change to reflect the current weather conditions, providing an immersive experience.
- ✅ **Daily Forecast:** See a summary of the upcoming days with temperatures and weather icons at a glance.
- ✅ **Persistent Last Location:** Remembers and automatically loads the weather for your last searched city using AsyncStorage for a seamless user experience.
- ✅ **Built with Modern Practices:** Crafted with TypeScript for type safety.

---

## 📸 Screenshots

<div align="center">
  
**Home Screen** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Search Active**

<img src="https://github.com/user-attachments/assets/66e52bfc-1e83-40a1-9b60-b38e2a047df7" alt="Home Screen" width="250" style="margin: 0 20px;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://github.com/user-attachments/assets/8931bf87-dd0e-47ee-af1e-5cb0bdd4a916" alt="Search Active" width="250" style="margin: 0 20px;" />

<br><br>

**Search Results** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Updated Location**

<img src="https://github.com/user-attachments/assets/22390a65-a1c9-4605-8a7f-cdcb7d493f75" alt="Search Results" width="250" style="margin: 0 20px;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://github.com/user-attachments/assets/d11234ad-037f-4fa5-8ce1-a2f30bb508a9" alt="Updated Location" width="250" style="margin: 0 20px;" />

</div>

---

## 🛠️ Tech Stack & Architecture

- ⚛️ **React Native (TypeScript):** For building a robust, cross-platform mobile application.
- 🎨 **NativeWind:** Powers the UI with the speed and convenience of TailwindCSS, allowing for rapid, utility-first styling directly in components.
- 🌐 **OpenWeather API:** The source of all real-time weather and forecast data.
- 💾 **AsyncStorage:** Used for light, persistent, on-device storage to cache the user's last searched location.

### 📂 Project Structure

The project is organized with a clear separation of concerns to ensure maintainability and scalability.

```
Weather-App/
├── src/
│   ├── api/           # Houses all logic for fetching data from OpenWeather API.
│   ├── components/    # Reusable UI components (e.g., SearchBar, Forecast Cards).
│   ├── constants/     # App-wide constants, including API keys and image assets.
│   ├── screens/       # Main application screens (e.g., HomeScreen).
│   ├── utils/         # Utility functions, including AsyncStorage helpers.
│   └── App.tsx        # The main entry point of the application.
├── assets/            # Static assets like icons and images.
├── package.json
└── README.md
```

---

## 🚀 Getting Started

Follow these steps to get the app running on your local machine.

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/Weather-App.git
cd Weather-App
```

### **2. Install Dependencies**

```bash
npm install
# or
yarn install
```

### **3. Add Your API Key**

**Important:** This app requires an API key from OpenWeather to function.

1. Go to [OpenWeather](https://openweathermap.org/) and create a free account to get your API key.
2. Open the file `src/constants/constants.ts` and replace the placeholder with your key:

```ts
// src/constants/constants.ts
export const API_KEY = "YOUR_API_KEY_HERE";
```

### **4. Run the App**

```bash
# To run on Android
npx react-native run-android

# To run on iOS
npx react-native run-ios

# If you are set up with Expo
npx expo start
```

---

## 🔮 Future Enhancements

This project has a solid foundation. Future improvements could include:

- 🌍 **Automatic Location Detection:** Use device GPS to show weather for the user's current location on startup.
- 🗓️ **Detailed 7-Day Forecast:** Create a new screen to show more detailed information for the weekly forecast.
- 🎨 **Theme Toggle:** Implement a Dark Mode / Light Mode switch.
- 🔔 **Weather Alerts:** Integrate push notifications for severe weather alerts.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/Weather-App/issues).

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

⭐ **If you found this project useful, please consider giving it a star!** ⭐
