import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


/*
- This function is used to get all contacts;
- Each contact will contain email, name, imange, and imageURL
- Frontend will use this information to display.
 */
//Update the below information according to your deployment
const REGION = "us-east-1";
const DYNAMODB_TABLE_NAME = "contacts-618653";
const S3_BUCKET_NAME = "final-images-618653";

//DO NOT change the below code as it is working correctly.
const s3 = new S3Client({ region: REGION });
const dynamoDB = new DynamoDBClient({ region: REGION });


export const handler = async () => {
  try {
    const scanCommand = new ScanCommand({ TableName: DYNAMODB_TABLE_NAME });
    const { Items } = await dynamoDB.send(scanCommand);

    const contacts = Items.map((item) => unmarshall(item));

    const contactsWithImages = await Promise.all(
      contacts.map(async (contact) => {
        if (contact.image) {
          const urlCommand = new GetObjectCommand({
            Bucket: S3_BUCKET_NAME,
            Key: contact.image,
          });

          const signedUrl = await getSignedUrl(s3, urlCommand, { expiresIn: 3600 }); // URL valid for 1 hour
          return { ...contact, imageUrl: signedUrl };
        }
        return contact;
      })
    );

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(contactsWithImages),
    };
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ message: "Server error", error: error.message }),
    };
  }
};
