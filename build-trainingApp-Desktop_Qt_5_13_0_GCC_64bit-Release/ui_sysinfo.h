/********************************************************************************
** Form generated from reading UI file 'sysinfo.ui'
**
** Created by: Qt User Interface Compiler version 5.13.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_SYSINFO_H
#define UI_SYSINFO_H

#include <QtCore/QVariant>
#include <QtWidgets/QApplication>
#include <QtWidgets/QFormLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QLabel>
#include <QtWidgets/QProgressBar>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_SysInfo
{
public:
    QFormLayout *formLayout;
    QHBoxLayout *horizontalLayout;
    QLabel *cpu_label;
    QProgressBar *cpu_Bar;
    QLabel *memory_label;
    QProgressBar *memory_Bar;

    void setupUi(QWidget *SysInfo)
    {
        if (SysInfo->objectName().isEmpty())
            SysInfo->setObjectName(QString::fromUtf8("SysInfo"));
        SysInfo->resize(510, 83);
        SysInfo->setStyleSheet(QString::fromUtf8(""));
        formLayout = new QFormLayout(SysInfo);
        formLayout->setObjectName(QString::fromUtf8("formLayout"));
        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setObjectName(QString::fromUtf8("horizontalLayout"));
        cpu_label = new QLabel(SysInfo);
        cpu_label->setObjectName(QString::fromUtf8("cpu_label"));
        cpu_label->setStyleSheet(QString::fromUtf8("height: 40px;\n"
"font: 75 16pt \"White Rabbit\";\n"
"color: #00ff00;"));

        horizontalLayout->addWidget(cpu_label);

        cpu_Bar = new QProgressBar(SysInfo);
        cpu_Bar->setObjectName(QString::fromUtf8("cpu_Bar"));
        cpu_Bar->setStyleSheet(QString::fromUtf8("QProgressBar {\n"
"    border: 2px solid #00ff00;\n"
"    border-radius: 5px;\n"
"    background-color: black;\n"
"}\n"
"QProgressBar::chunk {\n"
"    background-color: #00ff00;\n"
"    width: 5px;\n"
"    margin: 0.5px;\n"
"}"));
        cpu_Bar->setValue(24);
        cpu_Bar->setTextVisible(false);

        horizontalLayout->addWidget(cpu_Bar);

        memory_label = new QLabel(SysInfo);
        memory_label->setObjectName(QString::fromUtf8("memory_label"));
        memory_label->setStyleSheet(QString::fromUtf8("height: 40px;\n"
"font: 75 16pt \"White Rabbit\";\n"
"color: #00ff00;"));

        horizontalLayout->addWidget(memory_label);

        memory_Bar = new QProgressBar(SysInfo);
        memory_Bar->setObjectName(QString::fromUtf8("memory_Bar"));
        memory_Bar->setStyleSheet(QString::fromUtf8("QProgressBar {\n"
"    border: 2px solid #00ff00;\n"
"    border-radius: 5px;\n"
"    background-color: black;\n"
"}\n"
"QProgressBar::chunk {\n"
"    background-color: #00ff00;\n"
"    width: 5px;\n"
"    margin: 0.5px;\n"
"}"));
        memory_Bar->setValue(24);
        memory_Bar->setTextVisible(false);

        horizontalLayout->addWidget(memory_Bar);


        formLayout->setLayout(0, QFormLayout::LabelRole, horizontalLayout);


        retranslateUi(SysInfo);

        QMetaObject::connectSlotsByName(SysInfo);
    } // setupUi

    void retranslateUi(QWidget *SysInfo)
    {
        SysInfo->setWindowTitle(QCoreApplication::translate("SysInfo", "Form", nullptr));
        cpu_label->setText(QCoreApplication::translate("SysInfo", "CPU : ", nullptr));
        memory_label->setText(QCoreApplication::translate("SysInfo", "Memory : ", nullptr));
    } // retranslateUi

};

namespace Ui {
    class SysInfo: public Ui_SysInfo {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_SYSINFO_H
