//
//  ShakeController.h
//  rn
//
//  Created by 周原 on 2018/12/14.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>
NS_ASSUME_NONNULL_BEGIN

@interface ShakeController : UIViewController
@property(strong,nonatomic)AVAudioPlayer *player;
@property(strong,nonatomic)NSTimer * timer;
@end

NS_ASSUME_NONNULL_END
