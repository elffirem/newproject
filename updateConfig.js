const axios = require('axios');
const fs = require('fs');
const { exec } = require('child_process');

async function fetchAppDetails() {
    try {
        // Spring Boot API endpointini burada çağırıyoruz
        const response = await axios.get('http://localhost:8081/api/app-info');
console.log("API Response:", response.data);  // Bu satırı ekleyin


        if (response.data && response.data.length > 0) {
            const data = response.data[response.data.length-1];  // Son kayıdı alıyoruz
const transformedData = {
  app_name: data.appName,
  background_color: data.backgroundColor
};
            updateReactNativeConfig(transformedData);
            updateTheme(transformedData);
            buildApk();
        }
    } catch (error) {
        console.error('Bilgileri alırken bir hata oluştu:', error);
    }
}

function updateReactNativeConfig(data) {
    const androidStringsPath = 'android/app/src/main/res/values/strings.xml';

    let androidStringsContent = fs.readFileSync(androidStringsPath, 'utf8');
    androidStringsContent = androidStringsContent.replace(/<string name="app_name">.*<\/string>/, `<string name="app_name">${data.app_name}</string>`);
    
    fs.writeFileSync(androidStringsPath, androidStringsContent);
    console.log('Uygulama adı güncellendi!');
}

const appConfigPath = 'C:/Users/eikul/newproject/appConfig.json';

function updateTheme(data) {
    // Dosyanın var olup olmadığını kontrol et
    if (fs.existsSync(appConfigPath)) {
      let appConfig;
      try {
        // Dosyanın içeriğini oku ve parse et
        appConfig = JSON.parse(fs.readFileSync(appConfigPath, 'utf8'));
      } catch (e) {
        console.error('appConfig.json dosyası okunamadı veya parse edilemedi.', e);
        return;
      }
      
      // Tema rengini güncelle
      appConfig.backgroundColor = data.background_color;
      fs.writeFileSync(appConfigPath, JSON.stringify(appConfig, null, 2));
      console.log('Tema rengi güncellendi!');
    } else {
      console.error('appConfig.json dosyası bulunamadı!');
    }
  }
  

function buildApk() {
    // Windows için uygun komut formatı
    exec('cd android && gradlew.bat assembleRelease', (error, stdout, stderr) => {
        if (error) {
            console.error(`APK oluşturma hatası: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`APK oluşturma stderr: ${stderr}`);
            return;
        }
        console.log(stdout);
        console.log('APK başarıyla oluşturuldu!');
    });
}

fetchAppDetails();
