import {DevCheck} from "../apis/fileAPI";

export async function handleSecurity(e, diagram, setAlertMessage) {
  if (e.isTransactionFinished) {
    const jsonString = e.model.toIncrementalJson(e);
    const data = JSON.parse(jsonString);
    checkForLog(diagram, setAlertMessage);

    // Handling node modifications separately
    if (data.modifiedNodeData) {
      for (let i = 0; i < data.modifiedNodeData.length; i++) {
        if (
          data.modifiedNodeData[i].text === "QuickSight" ||
          data.modifiedNodeData[i].text === "OpenSearch Service" ||
          data.modifiedNodeData[i].text === "Athena" ||
          data.modifiedNodeData[i].text === "S3"
        ) {
          await handleNode(data.modifiedNodeData[i], diagram, setAlertMessage);
        }

    
      }
    }
    //checkForLog(diagram, setInfoMessage)
  }
}


async function handleNode(node, diagram, setAlertMessage) {
  //  const PostData = {
  //   checkOption: null,
  //   newData: null,
  //   diagramData: diagram.model.toJson(),
  // };

  try {
    const message = {
      key: Date.now().toString(), // Unique key for each message
      message:
        node.text +
        " 가 암호화되지 않을 시, 무단 접근 및 변조 등을 통한 보험 위험이 존재할 수 있습니다.",
    };

    setAlertMessage({
      key: Date.now(), // 현재 타임스탬프를 key로 사용
      message: message.message,
      tag: "Info",
    });
  } catch (error) {
    console.error("API Error:", error);
  }
}

async function checkForLog(diagram, setAlertMessage) {
  if (diagram.model.nodeDataArray.length > 0) {
    const hasQuickSightNode = diagram.model.nodeDataArray.some(
      (node) => node.text === "QuickSight"
    );
    const hasOpenSearch = diagram.model.nodeDataArray.some(
      (node) => node.text === "OpenSearch Service"
    );
    const hasAthena = diagram.model.nodeDataArray.some(
      (node) => node.text === "Athena"
    );
    const hasS3 = diagram.model.nodeDataArray.some(
      (node) => node.text === "S3"
    );
    // console.log("hasQuickSIghtNode" , hasQuickSightNode);
    // console.log("hellohihi");

    const message = {
      key: Date.now().toString(), // Unique key for each message
      hasmessage:
        " 로그저장매체가 암호화되지 않을 시, 무단 접근 및 변조 등을 통한 보험 위험이 존재할 수 있습니다."
    };
    if (hasQuickSightNode || hasOpenSearch || hasAthena || hasS3) {
      setAlertMessage({
        key: Date.now(), // 현재 타임스탬프를 key로 사용
        message: message.hasmessage,
        tag: "Info",
      });
    }
    /// dev 망이 있을 때 메세지 띄우기 

    // const message = {
    //   key: Date.now().toString(), // Unique key for each message
    //   hasmessage:
    //     " 로그저장매체가 암호화되지 않을 시, 무단 접근 및 변조 등을 통한 보험 위험이 존재할 수 있습니다.",
    // };
    // if (hasQuickSightNode || hasOpenSearch || hasAthena || hasS3) {
    //   setAlertMessage({
    //     key: Date.now(), // 현재 타임스탬프를 key로 사용
    //     message: message.hasmessage,
    //     tag: "Info",
    //   });
    // }
    /// dev 망이 있을 때 메세지 띄우기


    const devMessage = {
      key: Date.now().toString(), // Unique key for each message
      hasmessage: "개발, 테스트 및 운영 환경은 분리되어야 하며 보호되어야 합니다."
    };

    try {
      const jsonString = diagram.model.toJson();
      const response = await DevCheck(jsonString);
      if ( response.data.status) {
        setAlertMessage({
          key: Date.now(), // Use current timestamp as key
          message: devMessage.hasmessage,
          tag: "Info",
        });
      }

      const apiMessage = {
        key: Date.now().toString(), // Unique key for each message
        hasmessage: "Amazon API Gateway 뒤에 Lambda 함수와 같은 서버리스 워크로드를 배포한다."
      };
    
      if ( response.data.gatewayapi) {
        setAlertMessage({
          key: Date.now(), // Use current timestamp as key
          message: apiMessage.hasmessage,
          tag: "Info",
        });
      }
    } catch (error) {
      console.error("Error in DevCheck:", error);
      // Handle error appropriately (e.g., set an error message)
    }


    const devMessage2 = {
      key: Date.now().toString(), // Unique key for each message
      hasmessage:
        "EC2 사용 시 IMDSv1을 사용할 경우 XSS 취약점에 노출될 수 있습니다. IMDSv2 이상의 버전 사용을 권고합니다.",
    };

    try {
      const jsonString = diagram.model.toJson();
      const response = await DevCheck(jsonString);
      if (response.data.status) {
        setAlertMessage({
          key: Date.now(), // Use current timestamp as key
          message: devMessage2.hasmessage,
          tag: "Error",
        });
      }

      const apiMessage = {
        key: Date.now().toString(), // Unique key for each message
        hasmessage:
          "Amazon API Gateway 뒤에 Lambda 함수와 같은 서버리스 워크로드를 배포한다.",
      };

      if (response.data.gatewayapi) {
        setAlertMessage({
          key: Date.now(), // Use current timestamp as key
          message: apiMessage.hasmessage,
          tag: "Info",
        });
      }
    } catch (error) {
      console.error("Error in DevCheck:", error);
      // Handle error appropriately (e.g., set an error message)
    }
  }
}
