import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { createWriteStream } from "fs";
import { S3 } from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";

export const config = {
  api: {
    bodyParser: false,
  },
};
type Data = {
  msg?: string;
};
{/** s3 */}
const s3 = new S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});
// S3に画像をアップロードし、そのURLを取得する関数
const uploadFileToS3 = async (file: File) => {
  // アップロード時のファイル名を作成
  const fileName = `${Date.now()}-${file.name}`;
  // S3へのアップロードに必要な情報をまとめるオブジェクト
  const params: PutObjectRequest = {
    Bucket: process.env.S3_BUCKET_NAME ? process.env.S3_BUCKET_NAME : '',
    Key: fileName,
    ContentType: file.type,
    Body: file,
  };
  // Bucket: アップロード先のバケット名を環境変数から取得します。
  // Key: アップロードするファイルのキーを指定します。
  // ContentType: アップロードするファイルのMIMEタイプを指定します。
  // Body: アップロードするファイルデータを指定します。

  try {
    // S3に画像をアップロードする
    const data = await s3.upload(params).promise();
    // アップロード成功時の処理
    console.log('画像アップロード成功:', data.Location);
    // アップロードされた画像のURLを取得
    return data.Location;
  } catch (error) {
    // アップロードエラー発生時の処理
    console.error('画像アップロードエラー:', error);
    // null値を返す
    return null;
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") return;
  console.log('--------------------------------')
  const form = formidable({ multiples: true, uploadDir: __dirname });
  
  //console.log(req)
  form.onPart = (part: any) => {
    // ファイルの処理
    if (part.filename) {
      // ここでファイルをアップロード
      uploadFileToS3(part);
    } else {
      // ファイル以外の処理
      form.handlePart(part);
    }
  };
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('フォームのパースエラー:', err);
      return res.status(500).json({ msg: 'Internal Server Error' });
    }

    // ここでフォームデータの処理を行う
    console.log('フォームフィールド:', fields);
    
    res.status(200).json({ msg: "success!!" });
  });
}
  
  form.onPart = (part:any) => {
    
    // let formidable handle only non-file parts
    if (part.originalFilename === "" || !part.mimetype) {
      // used internally, please do not override!
      form._handlePart(part);
    } else if (part.originalFilename) {

      // 以下でファイルを書き出ししている      

      console.log(part.name);
      // /public/imagesディレクトリがないと正常に動かないので作成すること
      const path =
        "./public/" + new Date().getTime() + part.originalFilename;
      const stream = createWriteStream(path);
      part.pipe(stream);

      part.on("end", () => {
        console.log(part.originalFilename + " is uploaded");
        stream.close();
      });

    }
  };

  // input[type="file"]以外の値はここから見れた
  form.on('field', (name:any, value:any) => {
    console.log(name);
    console.log(value);
  })

  // これを実行しないと変換できない
  form.parse(req)

  // これでもinput[type="file"]以外の値はここから見れるが、fileは見れない
  // form.parse(req, async (err, fields, files) => {
  //   console.log("fields:", fields); // { name: '*'}
  //   console.log("files:", files); // {}

  //   res.status(200).json({ name: "!!!" });
  // });

  // レスポンス
  res.status(200).json({ msg: "success!!" });
}

