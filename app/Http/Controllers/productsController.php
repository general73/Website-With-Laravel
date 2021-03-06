<?php
/**
 * Created by PhpStorm.
 * User: alireza
 * Date: 1/26/17
 * Time: 12:00 PM
 */

namespace App\Http\Controllers;
use Illuminate\Http\Request;

class productsController extends Controller
{
    function __construct()
    {
        $this->middleware('guest');
    }

    function index(){

        $product1["image"]="/img/gallery1/(1).jpg";
        $product1["description"]="d1";
        $product1["id"]="1";

        $product2["image"]="/img/gallery1/(2).jpg";
        $product2["description"]="d2";
        $product2["id"]="2";

        $product3["image"]="/img/gallery1/(3).jpg";
        $product3["description"]="<h4>محصول شماره 3</h4>
                    <p>اطلاعات و توضیحات محصول شماره 3 اطلاعات و توضیحات محصول شماره 3 اطلاعات و 
توضیحات محصول شماره 3 اطلاعات و توضیحات محصول شماره 3.<br>اطلاعات و توضیحات محصول شماره 3                   
اطلاعات و توضیحات محصول شماره 3اطلاعات و توضیحات محصول شماره 3                  
                </p>";
        $product3["id"]="3";

        $products=array($product1,$product2,$product3,$product1,$product2);
        $products[]=$product3;//another way to add item to array

        $data["products"]=$products;
        return view('products',$data);
    }

    function showProduct($id){

        $data['productId'] = $id;
        $data['image'] = "/img/gallery1/($id).jpg";
        $data['description']="description $id";
        return view('showProduct', $data);
    }


    function registerProduct(Request $request,$id){

        $code = $request->input('CaptchaCode');
        $isHuman = captcha_validate($code);
        if(!$isHuman){
            $messages = [
                'CaptchaCode.required' => 'فیلد "کد امنیتی" خالی است.',
                'CaptchaCode.valid_captcha' => 'فیلد "کد امنیتی" معتبر نیست.',
            ];

            $rules = [//inputPhone,inputEmail,inputAddress,CaptchaCode
                'CaptchaCode'=>'bail|required|valid_captcha',
            ];

            $this->validate($request,$rules,$messages);
        }
        $messages = [
            'inputName.required' => 'فیلد "نام و نام خانوادگی" خالی است.',
            'inputEmail.required' => 'فیلد "ایمیل" خالی است.',
            'inputMeter.required' => 'فیلد "متراژ مورد نیاز" خالی است.',
            'inputMeter.numeric' => 'فیلد "متراژ مورد نیاز" معتبر نیست.',
            'inputEmail.email' => 'فیلد "ایمیل" معتبر نیست.',
            'inputPhone.numeric' => 'فیلد "شماره تماس" معتبر نیست.',
            'inputPhone.regex' => 'فیلد "شماره تماس" معتبر نیست.',
            'inputPhone.required' => 'فیلد "شماره تماس" خالی است.',
            'inputAddress.required' => 'فیلد "آدرس" خالی است.',
            'inputAddress.max' => 'فیلد "آدرس" باید کمتر از :max کاراکتر باشد.',
        ];
        $rules = [//inputPhone,inputEmail,inputAddress,CaptchaCode

            'inputName'=>'required',
            'inputMeter'=>'required|numeric',
            'inputPhone'=>'required|numeric|regex:/^(0)[0-9]{10}$/',
            'inputEmail'=>'required|email',
            'inputAddress'=>'required|max:800',
        ];
        $this->validate($request,$rules,$messages);

        require '../vendor/phpmailer/phpmailer/PHPMailerAutoload.php';

        $senderFrom=$request["inputEmail"];
        $senderName=$request["inputName"];
        $senderAddress=$request["inputAddress"];
        $senderNumber=$request["inputPhone"];
        $sendMeter=$request["inputMeter"];

        $mail = new \PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        //user pass
        $mail->Username = 'alireza.delavari2@gmail.com';
        $mail->Password = "alireza09216252866";
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom($senderFrom, $senderName);
        $mail->addAddress('alirezadl.73@gmail.com');
        $mail->addAddress($senderFrom);

        $emailView = \View::make('emails/email2',compact('senderName','senderNumber','senderFrom','senderAddress'))->render();
        $mail->CharSet="UTF-8";
        $mail->Subject = $senderName."  ".$senderNumber;
        $mail->Body= $emailView;
        $mail->AltBody = $emailView;
        $sendResult=false;
        if(!$mail->send()) {
            $sendResult=false;
        } else {
            $sendResult=true;
        }
        $data['sendResult']=$sendResult;
        $showProductView = $this->showProduct($id);
        return $showProductView->with('sendResult',$sendResult);
        //return view("products/$id",$data);
    }
}