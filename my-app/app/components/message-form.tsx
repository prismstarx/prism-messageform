"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import {
  ArrowLeft,
  Send,
  CheckCircle,
  Info,
  AlertCircle,
  Heart,
  X,
  ZoomIn,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const thankYouImages = [
  {
    id: 1,
    name: "1",
    url: "/placeholder.svg?height=200&width=200&text=🌸+Thank+You",
  },
  {
    id: 2,
    name: "2",
    url: "/placeholder.svg?height=200&width=200&text=💝+Thank+You",
  },
  {
    id: 3,
    name: "3",
    url: "/placeholder.svg?height=200&width=200&text=⭐+Thank+You",
  },
];

export default function MessageForm() {
  // -----------------------
  // GoogleForm
  // -----------------------
  const GOOGLE_FORM_NAME_ENTRY_ID = "entry.1563568283";
  const GOOGLE_FORM_EMAIL_ENTRY_ID = "entry.1202271956";
  const GOOGLE_FORM_MESSAGE_ENTRY_ID = "entry.1004124728";
  const GOOGLE_FORM_SUBMIT_URL =
    process.env.NEXT_PUBLIC_GOOGLE_FORM_SUBMIT_URL ?? "";

  // -----------------------
  // フォームバリデーション設定
  // -----------------------
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [selectedImage, setSelectedImage] = useState(thankYouImages[0]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  // -----------------------
  // フォームの状態管理
  // -----------------------
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // エラーをクリア
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.message.trim()) {
      newErrors.message = "メッセージは必須です";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(2);
    }
  };

  // -----------------------
  // フォーム送信処理
  // -----------------------
  const handleSubmit = async () => {
    // データエンコード
    const formData = new URLSearchParams();
    formData.append(GOOGLE_FORM_EMAIL_ENTRY_ID, "1");
    formData.append(GOOGLE_FORM_NAME_ENTRY_ID, "2");
    formData.append(GOOGLE_FORM_MESSAGE_ENTRY_ID, "3");
    console.log("送信データ:", formData.toString());
 
    try {
      setIsSubmitting(true);
      // fetch APIを使ってGoogleフォームにPOSTリクエストを送信
      const response = await fetch(GOOGLE_FORM_SUBMIT_URL, {
        method: "POST",
        body: formData.toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "no-cors",
      });
      console.log("送信APIコール完了");
    } catch (error) {
      console.error("送信エラー:", error);
    } finally {
      setIsSubmitting(false)
      setStep(3);
    }
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    setErrors({});
    setSelectedImage(thankYouImages[0]);
  };

  const toggleTooltip = (tooltipId: string) => {
    setActiveTooltip(activeTooltip === tooltipId ? null : tooltipId);
  };

  const handleClose = () => {
    // 実際のアプリケーションでは、ここでウィンドウを閉じるかページを遷移する
    console.log("フォームを閉じる");
  };

  // ステップ1: 入力フォーム
  if (step === 1) {
    return (
      <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 min-h-screen py-12">
        <div className="max-w-md mx-auto p-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-rose-100 via-pink-100 to-purple-100 text-center py-8">
              <div className="flex justify-center mb-4">
                <div className="bg-white/50 p-3 rounded-full">
                  <Heart className="w-8 h-8 text-rose-400" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                MESSAGE FORM
              </CardTitle>
              <CardDescription className="text-rose-500/70 text-sm">
                to PRISM. / なしこ
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-3">
                <Label
                  htmlFor="name"
                  className="flex items-center gap-2 text-rose-700 font-medium ml-1"
                >
                  NAME
                  <div className="relative">
                    <Info
                      className="w-4 h-4 text-gray-400 cursor-help hover:text-gray-500 transition-colors"
                      onMouseEnter={() => setActiveTooltip("name")}
                      onMouseLeave={() => setActiveTooltip(null)}
                      onClick={() => toggleTooltip("name")}
                    />
                    {activeTooltip === "name" && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-rose-100 text-rose-800 text-xs rounded-2xl shadow-lg border border-rose-200 whitespace-nowrap z-10 before:content-[''] before:absolute before:top-full before:left-1/2 before:transform before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-rose-100">
                        任意入力
                      </div>
                    )}
                  </div>
                </Label>
                <Input
                  id="name"
                  placeholder="お名前(任意)"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="border-2 border-rose-200 focus:border-rose-400 rounded-2xl py-3 px-4 bg-white/50 backdrop-blur-sm transition-all duration-200 focus:shadow-lg focus:shadow-rose-200/50"
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="email"
                  className="flex items-center gap-2 text-rose-700 font-medium ml-1"
                >
                  EMAIL
                  <div className="relative">
                    <Info
                      className="w-4 h-4 text-gray-400 cursor-help hover:text-gray-500 transition-colors"
                      onMouseEnter={() => setActiveTooltip("email")}
                      onMouseLeave={() => setActiveTooltip(null)}
                      onClick={() => toggleTooltip("email")}
                    />
                    {activeTooltip === "email" && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-rose-100 text-rose-800 text-xs rounded-2xl shadow-lg border border-rose-200 whitespace-nowrap z-10 before:content-[''] before:absolute before:top-full before:left-1/2 before:transform before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-rose-100">
                        任意入力
                      </div>
                    )}
                  </div>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="メールアドレス(任意)"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="border-2 border-rose-200 focus:border-rose-400 rounded-2xl py-3 px-4 bg-white/50 backdrop-blur-sm transition-all duration-200 focus:shadow-lg focus:shadow-rose-200/50"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="message"
                    className="flex items-center gap-2 text-rose-700 font-medium ml-1"
                  >
                    MESSAGE
                    <div className="relative">
                      <AlertCircle
                        className="w-4 h-4 text-pink-500 cursor-help hover:text-pink-600 transition-colors"
                        onMouseEnter={() => setActiveTooltip("message")}
                        onMouseLeave={() => setActiveTooltip(null)}
                        onClick={() => toggleTooltip("message")}
                      />
                      {activeTooltip === "message" && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-pink-100 text-pink-800 text-xs rounded-2xl shadow-lg border border-pink-200 whitespace-nowrap z-10 before:content-[''] before:absolute before:top-full before:left-1/2 before:transform before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-pink-100">
                          必須入力
                        </div>
                      )}
                    </div>
                  </Label>
                  <span className="text-xs text-gray-500 mr-1">
                    {formData.message.length}/10000
                  </span>
                </div>
                <Textarea
                  id="message"
                  placeholder="メッセージを入力"
                  className="min-h-[140px] border-2 border-rose-200 focus:border-rose-400 rounded-2xl py-3 px-4 bg-white/50 backdrop-blur-sm transition-all duration-200 focus:shadow-lg focus:shadow-rose-200/50 resize-none"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  maxLength={10000}
                />
                {errors.message && (
                  <p className="text-sm text-pink-500 ml-1">{errors.message}</p>
                )}
              </div>

              <Button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 hover:from-rose-500 hover:via-pink-500 hover:to-purple-500 text-white rounded-2xl py-4 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 font-medium"
              >
                送信内容を確認
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ステップ2: 確認フォーム
  if (step === 2) {
    return (
      <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 min-h-screen py-12">
        <div className="max-w-md mx-auto p-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-rose-100 via-pink-100 to-purple-100 text-center py-6">
              <div className="flex justify-center mb-3">
                <div className="bg-white/50 p-2 rounded-full">
                  <CheckCircle className="w-6 h-6 text-rose-400" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                CONFIRM
              </CardTitle>
              <div className="mt-3 p-3 bg-white/50 rounded-xl">
                <CardDescription className="text-rose-500/70 text-xs">
                  以下の内容で送信します。
                  <br />
                  よろしければ送信ボタンを押してください。
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-white to-rose-50/50 border border-rose-100 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold text-rose-700">
                      NAME
                    </Label>
                    <p className="text-sm text-rose-600/80 font-medium">
                      {formData.name || "未入力"}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-r from-white to-rose-50/50 border border-rose-100 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold text-rose-700">
                      EMAIL
                    </Label>
                    <p className="text-sm text-rose-600/80 font-medium break-all">
                      {formData.email || "未入力"}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-r from-white to-rose-50/50 border border-rose-100 rounded-xl shadow-sm">
                  <Label className="text-xs font-semibold text-rose-700">
                    MESSAGE
                  </Label>
                  <p className="mt-2 text-sm text-rose-600/80 font-medium whitespace-pre-wrap leading-relaxed">
                    {formData.message}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-rose-300 text-rose-600 hover:bg-rose-50 rounded-2xl py-3 font-medium transition-all duration-200 hover:shadow-md"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  修正
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 hover:from-rose-500 hover:via-pink-500 hover:to-purple-500 text-white rounded-2xl py-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 font-medium"
                >
                  <Send className="w-4 h-4 mr-2" />
                  送信
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ステップ3: 送信完了フォーム
  return (
    <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 min-h-screen py-12">
      <div className="max-w-md mx-auto p-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="text-center bg-gradient-to-r from-rose-100 via-pink-100 to-purple-100 py-10">
            <div className="flex justify-center mb-6">
              <div className="bg-white/50 p-4 rounded-full">
                <CheckCircle className="w-12 h-12 text-rose-400" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              THANK YOU!
            </CardTitle>
            <CardDescription className="text-rose-500/70 text-base">
              メッセージを送信しました。
              <br />
              ありがとうございました！
            </CardDescription>
          </CardHeader>
          {/* <CardContent className="p-8 space-y-8">
            <div className="text-center">
              <p className="text-rose-600/70 font-medium mb-6">Thank you!</p>
              <div className="flex justify-center gap-3 mb-6">
                {thankYouImages.map((image) => (
                  <Button
                    key={image.id}
                    onClick={() => setSelectedImage(image)}
                    variant={
                      selectedImage.id === image.id ? "default" : "outline"
                    }
                    className={`text-sm px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
                      selectedImage.id === image.id
                        ? "bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white shadow-lg"
                        : "border-2 border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300"
                    }`}
                  >
                    {image.name}
                  </Button>
                ))}
              </div>
              <div className="bg-gradient-to-r from-white to-rose-50/50 p-6 rounded-3xl border border-rose-100 shadow-sm">
                <div
                  className="relative group cursor-pointer"
                  onClick={() => setIsImageExpanded(true)}
                >
                  <img
                    src={selectedImage.url || "/placeholder.svg"}
                    alt={selectedImage.name}
                    className="w-36 h-36 mx-auto rounded-2xl shadow-md transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 rounded-2xl">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={handleClose}
              variant="outline"
              className="w-full border-2 border-rose-300 text-rose-600 hover:bg-rose-50 rounded-2xl py-4 font-medium transition-all duration-200 hover:shadow-md"
            >
              閉じる
            </Button>
          </CardContent> */}
        </Card>

        {/* 画像拡大表示モーダル */}
        {isImageExpanded && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsImageExpanded(false)}
          >
            <div className="relative bg-white rounded-3xl p-6 max-w-sm w-full">
              <button
                onClick={() => setIsImageExpanded(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-rose-100 hover:bg-rose-200 transition-colors"
              >
                <X className="w-4 h-4 text-rose-600" />
              </button>
              <img
                src={selectedImage.url || "/placeholder.svg"}
                alt={selectedImage.name}
                className="w-full rounded-2xl shadow-lg"
              />
              <p className="text-center mt-4 text-rose-600 font-medium">
                {selectedImage.name}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
