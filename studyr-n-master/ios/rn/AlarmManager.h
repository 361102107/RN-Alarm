//
//  AlarmManager.h
//  rn
//
//  Created by 周原 on 2018/12/12.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <AVFoundation/AVFoundation.h>
NS_ASSUME_NONNULL_BEGIN

@interface AlarmManager : NSObject <RCTBridgeModule>
@property(strong,nonatomic)AVAudioPlayer *player;

@end

NS_ASSUME_NONNULL_END
