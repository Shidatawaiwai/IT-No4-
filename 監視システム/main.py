# 仮に作ったやつ．特に関連はない

from ultralytics import YOLO
import cv2

# YOLOv8 のモデルをロード
model = YOLO("yolov8n-seg.pt") # 'yolov8n.pt' は軽量モデル

# 画像を読み込む
image_path = 'pic.jpg'  # 解析したい画像を指定
image = cv2.imread(image_path)

# 物体検出を実行

results = model(image)

# 検出結果を表示
for result in results:
    result.show()  # OpenCV を使って結果を表示
    result.save('output.jpg')

# 検出結果を保存（オプション）

