import axios from "axios";

export function ec2Price(priceElement) {
  let instance =
    "aws" +
    "-ec2" +
    "-" +
    priceElement["instanceType"] +
    "_" +
    priceElement["instanceSize"];
  //console.log("instance",instance);
  //console.log("billingOption",priceElement["billingOption"]);
  //console.log("platform",priceElement["platform"]);
  let platform = priceElement["platform"];
  let billingOption = priceElement["billingOption"];
  return new Promise((resolve, reject) => {
    axios({
      url: "/api/v1/pricing-api/ec2",
      method: "post",
      data: {
        platform: platform,
        instance: instance,
        lifeCycle: billingOption,
      },
      baseURL: "https://oncloud-back.k-paas.org",
    })
      .then(function (response) {
        // 가정: response에 원하는 데이터가 있음
        //console.log("response",response.data);
        let data = response.data.amount;
        // if(data !== null){
        //   resolve(data);
        // }
        resolve(data);
        //resolve(data);
        //resolve(response.data.currency);
        //return response.data.currency;
      })
      .catch(function (error) {
        console.error("Error occurred:", error);
        reject(error);
      });
  });
}

export function fetchPlatformData(
  platform,
  instanceType,
  setData,
  setLoading,
  setError
) {
  return new Promise((resolve, reject) => {
    setLoading(true);
    axios({
      url: "/api/v1/db-api/ec2",
      method: "post",
      data: {
        platform: platform,
        instanceType: instanceType,
      },
      baseURL: "https://oncloud-back.k-paas.org",
    })
      .then(function (response) {
        setData(response.data);
        ////console.log("response.data",response.data,"platform",platform)
        if (platform == "linux") {
          const newLinuxOptions = response.data.map((item) => ({
            value: item,
            label: item,
          }));

          resolve(newLinuxOptions);
        }
        if (platform == "windows") {
          const newWindowsOptions = response.data.map((item) => ({
            value: item,
            label: item,
          }));

          resolve(newWindowsOptions);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.error("Error occurred:", error);
        setError(error);
        setLoading(false);
        reject(error);
      });
  });
}
