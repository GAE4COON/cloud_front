import React, { useState, useEffect } from "react";
import "../../styles/SelectToggle.css";
import axios from 'axios';

const baseOptions = [
  "linux",
  "windows"
  ];

const onTypeOptions = [
  { value: "T3.1", label: "on-demand" }
];
 

// function rdsPrice(priceElement) {           //여기서 bad request가 뜬다
//   console.log("price까지는 오는 거니??",priceElement);
//   let dbengine=priceElement["engine"];
//   let dbinstance=[priceElement["instancetype"]];
//   let dbsize=[priceElement["size"]];
//   let dbinstanceType=dbinstance+"."+dbsize;

//   console.log("dbengine: "+dbengine);
//   return new Promise((resolve, reject) => {
//     axios({
//       url: '/api/v1/pricing-api/rds',
//       method: 'post',
//       data: {
//         "dbEngine": dbengine,
//         "instanceType": dbinstanceType,
//       },
//       baseURL: 'http://localhost:8080',
//     })
//     .then(function (response) {
//       // 가정: response에 원하는 데이터가 있음
//       console.log("response",response.data[0].priceUSD);
//       resolve(response.data[0].priceUSD);
//     })
//     .catch(function (error) {
//       console.error("못갔어용:", error);
//       reject(error);
//     });
//   });
// }

function fetchEngineData(platform, instanceType, setData, setLoading, setError) {
  console.log("db에 접근 엔진:", platform);

  return new Promise((resolve, reject) => {
    setLoading(true);
    axios({
      url: '/api/v1/pricing-api/ec2',
      method: 'post',
      data: {
        "platform": platform,
        // "instanceType":"hello"
      },
      baseURL: 'http://localhost:8080',
    })
    .then(function (response) {
      setData(response.data);
      console.log(response.data);
      const ec2data = response.data; 
      console.log("전체 데이터가 들어온다.", ec2data);
      resolve(ec2data); // <-- resolve with data
    })
    .catch(function (error) {
      console.error("Error occurred:", error);
      setError(error);
      setLoading(false);
      reject(error);
    });
  });
}

const SelectEc22Toggle = ({ diagram, uniquekey, finalToggleValue, setFinalToggleValue}) => {
  
  const [toggle1Value, setToggle1Value] = useState(null);
  const [toggle2Value, setToggle2Value] = useState(null);
  const [toggle3Value, setToggle3Value] = useState(null);

  const [uniqueKey,setUniqueKey] = useState(null);

  const [toggle2Options, setToggle2Options] = useState([]);
  const [toggle3Options, setToggle3Options] = useState([]);
  const [price ,setPrice] = useState(null);
  const [select, setSelect] = useState(["Platform", "Instance Type","Size"]);

  const [ec2Option, setEc2Option] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  //삭제시 다이어그램에 있는 노드 데이터 삭제
  const handleDeletKey = (uniqueKey) => {
    setFinalToggleValue((prev) => {
      const newState = {...prev};
      delete newState[uniqueKey];
      return newState;
    });
  }

  diagram.addDiagramListener("SelectionDeleting", function (e) {
      e.subject.each(function (part) {
        handleDeletKey(part.key);
      });
  });

  

  //첫번째 토글이 set 되었을때 db에 인스턴스와 size 질의
  useEffect(() => {
    if (toggle1Value) {
      async function fetchOptions() {
        try {
          console.log("Platform",toggle1Value);
          const options = await fetchEngineData(toggle1Value, null, setData, setLoading, setError);
          console.log("options",options["details"]["instanceType"]);
          setToggle2Options(options["details"]["instanceType"]);
          setEc2Option(options);
          setToggle2Value(null);
          setToggle3Value(null);
        } catch (err) {
          console.error("Error fetching engine data:", err);
        }
      }

      fetchOptions();
    } else {
      setToggle2Options([]);
      setToggle2Value(null);
    }
  }, [toggle1Value]);

    //toggle2 즉 size를 set해준다
  useEffect(() => {
    if (toggle2Value) {
      console.log("instanceType",toggle2Value);
    setToggle3Options(ec2Option["details"][toggle2Value]);
    setToggle3Value(null);
    }
  }, [toggle2Value]);


    //toggle3 즉 price를 set해준다
  useEffect(() => {
    if (toggle3Value) {
      let price = toggle2Value + "." + toggle3Value;
      console.log("price", price, ec2Option["insertEC2EntityDetails"][price]);
      if(finalToggleValue[uniqueKey] 
        && Object.keys(finalToggleValue[uniqueKey]).length == 4
        && !(Object.values(finalToggleValue[uniqueKey]["size"]).includes("s"))  //여기 value를 수정하면 될듯
        && (Object.values(finalToggleValue[uniqueKey]["cost"]).includes("L"))
       )
      {
        setFinalToggleValue(prev => {
          if (!prev[uniqueKey] ) {
            return prev; // 이전 상태를 반환하거나 초기 상태를 설정할 수 있습니다.
          }
          console.log("이까지 오니");
          const updatedEntry = {...prev[uniqueKey]};
          updatedEntry.cost = ec2Option["insertEC2EntityDetails"][price][4];
          return { ...prev, [uniqueKey]: updatedEntry};
        });
        //setPrice(calculatedPrice); //여기서 값이 잘 안들어 가는듯??
        setPrice(ec2Option["insertEC2EntityDetails"][price][4]);

      }
     
    }
  }, [toggle3Value]);
  
  //선택한 노드의 key 저장
  useEffect(() => {
    setUniqueKey(uniquekey);
    setToggle1Value(null);
    setToggle2Value(null);
    setToggle3Value(null);
  },[uniquekey]);
  
  


  useEffect(() => {          //이미 유니크키가 세팅이 완료된경우일듯
    if (
        finalToggleValue[uniqueKey] &&
        Object.keys(finalToggleValue[uniqueKey]).length === 4  
      ) {
        console.log("setselect 전 finaltoggle입니당",Object.values(finalToggleValue[uniqueKey]["platform"]));
        setSelect([
          Object.values(finalToggleValue[uniqueKey]["platform"]),
          Object.values(finalToggleValue[uniqueKey]["instancetype"]),
          Object.values(finalToggleValue[uniqueKey]["size"]),
        ]);
        Object.values(finalToggleValue[uniqueKey]["platform"]);
        //setToggle2Value(finalToggleValue[uniqueKey][1]);  //이걸 없애면 뜨는데
        setPrice(finalToggleValue[uniqueKey]["cost"]);
      } else {
        setPrice("Loading");
        setSelect(["platform", "Instance Type", "size"]);
      }

  }, [finalToggleValue, uniqueKey]);



  const handleChange = (index, event) => {
    const newValue = event.target.value;

    if (index === 0) {
      setToggle1Value(newValue);
      
      setFinalToggleValue(prev => {
        const updatedEntry = {
          platform: "Platform",
          instancetype: "Instance Type",
          size: "Size",
          cost: "Loading"
        };
        updatedEntry.platform = newValue;
        updatedEntry.cost = "Loading";
        return { ...prev, [uniqueKey]: updatedEntry };
      });
      console.log("1번 성공저장");
    } else if (index === 1) {
      console.log("전");
      setToggle2Value(newValue);
      setFinalToggleValue(prev => {
        const updatedEntry = {...prev[uniqueKey]};
        updatedEntry.instancetype = newValue;
        updatedEntry.size = "Size";
        updatedEntry.cost = "Loading"
        return { ...prev, [uniqueKey]: updatedEntry };
      });
      setToggle3Value(null);
      console.log("2번째 성공 저장");
    } else if (index === 2) {
      console.log("세번째까지 오네엽")
      setToggle3Value(newValue);
      setFinalToggleValue(prev => {
        const updatedEntry = {...prev[uniqueKey]};
        updatedEntry.size = newValue;
        updatedEntry.cost = "Loading";
        return { ...prev, [uniqueKey]: updatedEntry };
      });
    } 
  };


  console.log("FinalToggle",finalToggleValue);

  const renderToggle = (index, Select, value, options) => {
    return (
      <select
        value={value || ""}
        onChange={(e) => handleChange(index, e)}
      >
        <option value="" disabled>{Select}</option>
      {options.map((option, idx) => (
        <option key={idx}>
          {option}
        </option>
      ))}
    </select>
      );
    };

  const Item = ({price}) =>{

    if(!price || price.length < 1) {
      return null;
    }
    
    return (
      <div>
        {price}
      </div>
    );
    
  }
  return (
    <div className ="ec2">
      <div className="toggle-component">
        {renderToggle(0, select[0], toggle1Value, baseOptions)}
        {renderToggle(1, select[1], toggle2Value, toggle2Options)}
        {renderToggle(2, select[2], toggle3Value, toggle3Options)}
        

        <div className="price">
          <Item price={price} />
        </div>
      </div>
      
    </div>
  );
};

export default React.memo(SelectEc22Toggle);