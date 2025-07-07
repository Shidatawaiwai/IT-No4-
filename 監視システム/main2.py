import cv2
import time
from ultralytics import YOLO


def smokeDecision(position):
    print("けむり！！")

def fireDecision(position):
    print("ほのお！！")



def main():
    model = YOLO('best.pt')
    cap = cv2.VideoCapture(0)

    while cap.isOpened():
        #retにはフレームを読み込めたかのブール値が格納
        ret,frame = cap.read()

        if ret:
            results = model.predict(frame,conf = 0.5)
            annotatedFrame = results[0].plot()  #なんですかこれ

            #一度に処理するフレームは一枚なのでresults[0]で十分なり
            for i in range(len(results[0].boxes)):
                #clsが0：smoke，clsが1:fire
                #xywhは左上の座標とそこからの幅wと高さh（於スクリーン座標）
                if results[0].boxes[i].cls == 0:
                    smokeDecision(results[0].boxes[i].xywh)
                elif results[0].boxes.cls[i] == 1:
                    fireDecision(results[0].boxes[i].xywh)
                else:
                    print("なんですかこのエラーは")
            
            
            cv2.imshow("kanshi",annotatedFrame)


        else:
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()