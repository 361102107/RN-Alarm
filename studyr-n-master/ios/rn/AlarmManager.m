//
//  AlarmManager.m
//  rn
//
//  Created by 周原 on 2018/12/12.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "AlarmManager.h"
#import <React/RCTLog.h>
#import <UserNotifications/UserNotifications.h>

@implementation AlarmManager

+ (AlarmManager *)shareInstance{
  static AlarmManager * s_instance_dj_singleton = nil ;
  if (s_instance_dj_singleton == nil) {
    s_instance_dj_singleton = [[AlarmManager alloc] init];
  }
  return (AlarmManager *)s_instance_dj_singleton;
}
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(openAlarmWithTime:(NSString *)timeStr repeat:(NSString *)repeatStr soundName:(NSString *)soundName closeMode:(NSString *)closeMode remark:(NSString *)remark index:(NSString *)index)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", timeStr, remark);
  NSDateFormatter * formatter = [[NSDateFormatter alloc] init];
  [formatter setDateFormat:@"HH:mm"];
  NSDate * date = [formatter dateFromString:timeStr];

  
  
  //设置时区（跟随手机的时区）
  UILocalNotification *localNotification = [[UILocalNotification alloc] init];
  localNotification.timeZone = [NSTimeZone defaultTimeZone];
  if (localNotification) {
    //   设置推送时的显示内容
    localNotification.alertBody = [remark isEqualToString:@""] ? @"闹钟提醒" : remark;
    localNotification.alertAction = @"打开";
    //   推送的铃声  不能超过30秒  否则会自定变为默认铃声
    localNotification.soundName = [NSString stringWithFormat:@"%@%@",soundName,@".mp3"];
    //通知发出的时间
    localNotification.fireDate = date;
  }
  //循环通知的周期   每天
  localNotification.repeatInterval = kCFCalendarUnitDay;
  
  //设置userinfo方便撤销
  NSDictionary * info = @{@"AlarmIndex":index,@"closeMode":closeMode,@"soundName":soundName,@"repeatStr":repeatStr,@"name":@"AlarmNotification"};
  localNotification.userInfo = info;
  //启动任务
  [[UIApplication sharedApplication] scheduleLocalNotification:localNotification];
}

RCT_EXPORT_METHOD(deleteAlarmWithTime:(NSString *)timeStr index:(NSString *)index){
  // 获取所有本地通知数组
  NSArray *localNotifications = [UIApplication sharedApplication].scheduledLocalNotifications;
  for (UILocalNotification *notification in localNotifications)
  {
    NSDictionary *userInfo = notification.userInfo;
    if ([index isEqualToString:userInfo[@"AlarmIndex"]]) {
      [[UIApplication sharedApplication] cancelLocalNotification:notification];
    }
  }
  
}

RCT_EXPORT_METHOD(playSound:(NSString *)soundName){
  NSURL * url = [[NSBundle mainBundle] URLForResource:[NSString stringWithFormat:@"%@%@",soundName,@".mp3"] withExtension:nil];
  NSError * error = nil;
  [AlarmManager shareInstance].player = [[AVAudioPlayer alloc] initWithContentsOfURL:url error:&error];
  [AlarmManager shareInstance].player.numberOfLoops = 0;
  
  [AlarmManager shareInstance].player.volume = 1;
  [[AlarmManager shareInstance].player prepareToPlay];
  [[AlarmManager shareInstance].player play];
  
}

RCT_EXPORT_METHOD(stopPlaySound){
  if([AlarmManager shareInstance].player){
    [[AlarmManager shareInstance].player stop];
  }
  
  
}
@end
