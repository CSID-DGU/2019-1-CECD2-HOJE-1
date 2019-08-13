#ifndef SYSINFO_H
#define SYSINFO_H

#include <QWidget>

namespace Ui {
class SysInfo;
}

class SysInfo : public QWidget
{
    Q_OBJECT

public:
    explicit SysInfo(QWidget *parent = nullptr);
    ~SysInfo();

private:
    Ui::SysInfo *ui;
};

#endif // SYSINFO_H
