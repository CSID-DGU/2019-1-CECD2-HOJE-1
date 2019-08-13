#include "sysinfo.h"
#include "ui_sysinfo.h"

SysInfo::SysInfo(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::SysInfo)
{
    ui->setupUi(this);
}

SysInfo::~SysInfo()
{
    delete ui;
}
