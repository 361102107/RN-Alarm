//
//  ShakeController.m
//  rn
//
//  Created by 周原 on 2018/12/14.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "ShakeController.h"

@interface ShakeController ()
@property(nonatomic,assign)NSInteger shakeCount;
@property(nonatomic,strong)UILabel * countLb;
@end

@implementation ShakeController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  _shakeCount = 15;
  [self creatUI];
}

- (void)creatUI{
  self.view.backgroundColor = [UIColor colorWithRed:26/255.0 green:26/255.0 blue:26/255.0 alpha:1];
  
  CGFloat width = [UIScreen mainScreen].bounds.size.width;
  
  UILabel * titlelb = [[UILabel alloc] initWithFrame:CGRectMake(20, 180, width - 40, 40)];
  titlelb.text = @"摇晃手机关闭闹钟";
  titlelb.textAlignment = NSTextAlignmentCenter;
  titlelb.font = [UIFont boldSystemFontOfSize:25];
  titlelb.textColor = [UIColor whiteColor];
  [self.view addSubview:titlelb];
  
  _countLb = [[UILabel alloc] initWithFrame:CGRectMake(0, CGRectGetMaxY(titlelb.frame) + 10, 50, 50)];
  _countLb.text = [NSString stringWithFormat:@"%ld",_shakeCount];
  _countLb.center = CGPointMake(width/2, _countLb.center.y);
  _countLb.font = [UIFont boldSystemFontOfSize:40];
  _countLb.textColor = [UIColor whiteColor];
  [self.view addSubview:_countLb];
  
  UIImageView * imageView = [[UIImageView alloc] initWithFrame:CGRectMake(0, CGRectGetMaxY(_countLb.frame) + 20, 90, 90)];
  imageView.center = CGPointMake(width/2, imageView.center.y);
  imageView.image = [UIImage imageNamed:@"shake"];
  [self.view addSubview:imageView];
}

- (void)motionBegan:(UIEventSubtype)motion withEvent:(UIEvent *)event{
  if(UIEventSubtypeMotionShake == motion){
    _shakeCount = _shakeCount - 1;
    if(_shakeCount == 0){
      [_player stop];
      [self.timer setFireDate:[NSDate distantFuture]];
      [self dismissViewControllerAnimated:true completion:nil];
    }else{
      _countLb.text = [NSString stringWithFormat:@"%ld",_shakeCount];
    }
  }
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
