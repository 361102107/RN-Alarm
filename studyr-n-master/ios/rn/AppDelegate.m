/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <UserNotifications/UserNotifications.h>
#import "AudioToolbox/AudioToolbox.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "ShakeController.h"
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"rn"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  UIUserNotificationSettings *setting = [UIUserNotificationSettings settingsForTypes:UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge categories:nil];
  [[UIApplication sharedApplication] registerUserNotificationSettings:setting];
  
  //播放视频扬声器没有声音，插上耳机能听到声音等类似问题
  [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryPlayback error:nil];
  return YES;
}

- (NSTimer *)timer{
  if(!_timer){
    _timer = [NSTimer scheduledTimerWithTimeInterval:1 target:self selector:@selector(processTimer) userInfo:nil repeats:YES];
    [_timer setFireDate:[NSDate distantFuture]];
    
  }
  return _timer;
}

- (void)processTimer{
  AudioServicesPlaySystemSound(kSystemSoundID_Vibrate);
}


//推送的内容
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification*)notification
{
  
  //通过notification的useinfo，干一些你想做的事情了
  if ([[notification.userInfo objectForKey:@"name"] isEqualToString:@"AlarmNotification"])//如果收到的是备忘录的本地推送，则弹出下面一样的一个alertView
  {
    [self.timer setFireDate:[NSDate distantPast]];
    NSString * soundName = [notification.userInfo objectForKey:@"soundName"];
    NSURL * url = [[NSBundle mainBundle] URLForResource:[NSString stringWithFormat:@"%@%@",soundName,@".mp3"] withExtension:nil];
    NSError * error = nil;
    self.player = [[AVAudioPlayer alloc] initWithContentsOfURL:url error:&error];
    self.player.numberOfLoops = -1;
    self.player.volume = 1.0;
    [self.player prepareToPlay];
    [self.player play];
    
    if([[notification.userInfo objectForKey:@"closeMode"] isEqualToString:@"默认"]){
      UIAlertController * alert = [UIAlertController alertControllerWithTitle:@"闹钟通知" message:@"起床啦" preferredStyle:UIAlertControllerStyleAlert];
      UIAlertAction * sure = [UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
        [self.player stop];
        [self.timer setFireDate:[NSDate distantFuture]];
      }];
      [alert addAction:sure];
      [self.window.rootViewController presentViewController:alert animated:YES completion:nil];
      
    }else if([[notification.userInfo objectForKey:@"closeMode"] isEqualToString:@"答题"]){
      [self createAnswerAlert];
      
    }else if([[notification.userInfo objectForKey:@"closeMode"] isEqualToString:@"摇晃"]){
      ShakeController * svc = [[ShakeController alloc] init];
      svc.player = _player;
      svc.timer = _timer;
      [self.window.rootViewController presentViewController:svc animated:YES completion:nil];
    }
  }
  //查看了一条推送，将右上角的数字减一
  application.applicationIconBadgeNumber -= 1;
}
- (void)createAnswerAlert{
  NSArray * symbol = @[@"+",@"-"];
  int a = arc4random()%100;
  int b = arc4random()%100;
  int c = arc4random()%100%2;
  int result = 0;
  if(c == 0){
    result = a + b;
  }else{
    result = a - b;
  }
  NSString * title = [NSString stringWithFormat:@"%@ %@ %@ = ?",@(a),symbol[c],@(b)];
  UIAlertController *alertVc = [UIAlertController alertControllerWithTitle:title message:nil preferredStyle:UIAlertControllerStyleAlert];
  // 添加输入框 (注意:在UIAlertControllerStyleActionSheet样式下是不能添加下面这行代码的)
  [alertVc addTextFieldWithConfigurationHandler:^(UITextField * _Nonnull textField) {
    textField.placeholder = @"请输入正确答案";
  }];
  UIAlertAction *action1 = [UIAlertAction actionWithTitle:@"确认" style:UIAlertActionStyleDestructive handler:^(UIAlertAction * _Nonnull action) {
    if([[[alertVc textFields] objectAtIndex:0].text integerValue] == result){
      [self.player stop];
      [self.timer setFireDate:[NSDate distantFuture]];
    }else{
      [self createAnswerAlert];
    }
  }];
  // 添加行为
  [alertVc addAction:action1];
  [self.window.rootViewController presentViewController:alertVc animated:YES completion:nil];
}

@end
