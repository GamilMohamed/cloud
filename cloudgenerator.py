cloud = []
filenames = ["cloudpixel.png", "cloudpixel2.png"]
minSize = 150
maxSize = 350

endPosition = 0
startPosition = 100
import random
print("export const cloudsData = [")
for i in range(0, 100):
    cloud.append([filenames[random.randint(0, 1)], str(random.randint(minSize, maxSize)) + "px", random.randint(endPosition, startPosition), random.randint(endPosition, startPosition), random.randint(3, 10), random.randint(0, 100)])
    # cloud.append([filenames[random.randint(0, 1)], random.randint(minSize, maxSize) + "px", random.randint(endPosition, startPosition), random.randint(endPosition, startPosition)])
    if cloud[i][2] > cloud[i][3]:
        cloud[i][2], cloud[i][3] = cloud[i][3], cloud[i][2]
    cloud[i][2] = str(cloud[i][2]) + "vh"
    cloud[i][3] = str(cloud[i][3]) + "vh"
    print(f'{cloud[i]},')
print("]")