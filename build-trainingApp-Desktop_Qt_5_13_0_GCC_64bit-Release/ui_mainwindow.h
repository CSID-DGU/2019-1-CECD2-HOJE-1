/********************************************************************************
** Form generated from reading UI file 'mainwindow.ui'
**
** Created by: Qt User Interface Compiler version 5.13.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAINWINDOW_H
#define UI_MAINWINDOW_H

#include <QtCore/QVariant>
#include <QtWidgets/QApplication>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QMenuBar>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpacerItem>
#include <QtWidgets/QStatusBar>
#include <QtWidgets/QTextEdit>
#include <QtWidgets/QToolBar>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QWidget *centralWidget;
    QGridLayout *gridLayout;
    QWidget *buttonWidget;
    QVBoxLayout *verticalLayout;
    QPushButton *images_train;
    QPushButton *singleImage_train;
    QPushButton *fonts_train;
    QPushButton *multi_lang;
    QPushButton *transmit_button;
    QPushButton *version_button;
    QPushButton *box_edit;
    QSpacerItem *verticalSpacer;
    QVBoxLayout *verticalLayout_2;
    QTextEdit *textEdit;
    QHBoxLayout *horizontalLayout;
    QHBoxLayout *sysinfoLayout;
    QSpacerItem *horizontalSpacer;
    QPushButton *quit_button;
    QMenuBar *menuBar;
    QToolBar *mainToolBar;
    QStatusBar *statusBar;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName(QString::fromUtf8("MainWindow"));
        MainWindow->resize(953, 529);
        MainWindow->setStyleSheet(QString::fromUtf8("QMessageBox {\n"
"    background-color: black;\n"
"    border: 3px solid #00ff00;\n"
"	 font: 75 11pt \"White Rabbit\";\n"
"}\n"
"QMessageBox QLabel {\n"
"    color: #00ff00;\n"
"}\n"
"QMessageBox QPushButton {\n"
"  background-color: black;\n"
"  border: 3px solid #00dd00;\n"
"  font: 75 16pt \"White Rabbit\";\n"
"  color: #00dd00;\n"
"}\n"
"QMessageBox QPushButton:hover {\n"
"  border: 4px solid #00ff00;\n"
"  font: 75 17pt \"White Rabbit\";\n"
"  color: #00ff00;\n"
"}\n"
"\n"
"QDialog {\n"
"    background-color: black;\n"
"    border: 3px solid #00ff00;\n"
"	 font: 75 11pt \"White Rabbit\";\n"
"}\n"
"QDialog QLabel {\n"
"    color: #00ff00;\n"
"}\n"
"QDialog QPushButton {\n"
"  background-color: black;\n"
"  border: 3px solid #00dd00;\n"
"  font: 75 16pt \"White Rabbit\";\n"
"  color: #00dd00;\n"
"}\n"
"QDialog QPushButton:hover {\n"
"  border: 4px solid #00ff00;\n"
"  font: 75 17pt \"White Rabbit\";\n"
"  color: #00ff00;\n"
"}\n"
"\n"
""));
        centralWidget = new QWidget(MainWindow);
        centralWidget->setObjectName(QString::fromUtf8("centralWidget"));
        centralWidget->setStyleSheet(QString::fromUtf8("QPushButton {\n"
"  background-color: black;\n"
"  height: 40px;\n"
"  border: 3px solid #00dd00;\n"
"  font: 75 16pt \"White Rabbit\";\n"
"  color: #00dd00;\n"
"}\n"
"QPushButton:hover {\n"
"  border: 4px solid #00ff00;\n"
"  font: 75 17pt \"White Rabbit\";\n"
"  color: #00ff00;\n"
"} \n"
"QScrollBar:vertical {\n"
"     border: 2px solid #00ff00;\n"
"     background: black;\n"
"     width: 15px;\n"
"     margin: 22px 0 22px 0;\n"
" }\n"
" QScrollBar::handle:vertical {\n"
"	 border: 2px solid black;\n"
"     background: #00ff00;\n"
" }\n"
" QScrollBar::add-line:vertical {\n"
"     border: 2px solid #00ff00;\n"
"     background: black;\n"
"     height: 20px;\n"
"     subcontrol-position: bottom;\n"
"     subcontrol-origin: margin;\n"
" }\n"
" QScrollBar::sub-line:vertical {\n"
"     border: 2px solid #00ff00;\n"
"     background: black;\n"
"     height: 20px;\n"
"     subcontrol-position: top;\n"
"     subcontrol-origin: margin;\n"
" }\n"
" QScrollBar::up-arrow:vertical, QScrollBar::down-arrow:vertical {\n"
"  "
                        "   border: 2px solid black;\n"
"     width: 3px;\n"
"     height: 3px;\n"
"     background: #00ff00;\n"
" }\n"
" QScrollBar::add-page:vertical, QScrollBar::sub-page:vertical {\n"
"     background: none;\n"
" }"));
        gridLayout = new QGridLayout(centralWidget);
        gridLayout->setSpacing(6);
        gridLayout->setContentsMargins(11, 11, 11, 11);
        gridLayout->setObjectName(QString::fromUtf8("gridLayout"));
        buttonWidget = new QWidget(centralWidget);
        buttonWidget->setObjectName(QString::fromUtf8("buttonWidget"));
        buttonWidget->setStyleSheet(QString::fromUtf8("\n"
"QPushButton {\n"
"  background-color: black;\n"
"  height: 40px;\n"
"  border: 3px solid #00dd00;\n"
"  font: 75 16pt \"White Rabbit\";\n"
"  color: #00dd00;\n"
"}\n"
"QPushButton:hover {\n"
"  border: 4px solid #00ff00;\n"
"  font: 75 17pt \"White Rabbit\";\n"
"  color: #00ff00;\n"
"}\n"
""));
        verticalLayout = new QVBoxLayout(buttonWidget);
        verticalLayout->setSpacing(6);
        verticalLayout->setContentsMargins(11, 11, 11, 11);
        verticalLayout->setObjectName(QString::fromUtf8("verticalLayout"));
        images_train = new QPushButton(buttonWidget);
        images_train->setObjectName(QString::fromUtf8("images_train"));

        verticalLayout->addWidget(images_train);

        singleImage_train = new QPushButton(buttonWidget);
        singleImage_train->setObjectName(QString::fromUtf8("singleImage_train"));

        verticalLayout->addWidget(singleImage_train);

        fonts_train = new QPushButton(buttonWidget);
        fonts_train->setObjectName(QString::fromUtf8("fonts_train"));

        verticalLayout->addWidget(fonts_train);

        multi_lang = new QPushButton(buttonWidget);
        multi_lang->setObjectName(QString::fromUtf8("multi_lang"));

        verticalLayout->addWidget(multi_lang);

        transmit_button = new QPushButton(buttonWidget);
        transmit_button->setObjectName(QString::fromUtf8("transmit_button"));

        verticalLayout->addWidget(transmit_button);

        version_button = new QPushButton(buttonWidget);
        version_button->setObjectName(QString::fromUtf8("version_button"));

        verticalLayout->addWidget(version_button);

        box_edit = new QPushButton(buttonWidget);
        box_edit->setObjectName(QString::fromUtf8("box_edit"));
        box_edit->setStyleSheet(QString::fromUtf8("QPushButton.disabled {\n"
"  opacity: 0.6;\n"
"  cursor: not-allowed;\n"
"}"));

        verticalLayout->addWidget(box_edit);

        verticalSpacer = new QSpacerItem(20, 40, QSizePolicy::Minimum, QSizePolicy::Expanding);

        verticalLayout->addItem(verticalSpacer);


        gridLayout->addWidget(buttonWidget, 0, 0, 1, 1);

        verticalLayout_2 = new QVBoxLayout();
        verticalLayout_2->setSpacing(6);
        verticalLayout_2->setObjectName(QString::fromUtf8("verticalLayout_2"));
        textEdit = new QTextEdit(centralWidget);
        textEdit->setObjectName(QString::fromUtf8("textEdit"));
        textEdit->setStyleSheet(QString::fromUtf8("QTextEdit {\n"
"border: 4px solid #00ff00;\n"
"font: 75 11pt \"White Rabbit\";\n"
"background-color: black;\n"
"color: #00ff00;\n"
"}\n"
""));
        textEdit->setVerticalScrollBarPolicy(Qt::ScrollBarAsNeeded);

        verticalLayout_2->addWidget(textEdit);

        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setSpacing(6);
        horizontalLayout->setObjectName(QString::fromUtf8("horizontalLayout"));
        sysinfoLayout = new QHBoxLayout();
        sysinfoLayout->setSpacing(6);
        sysinfoLayout->setObjectName(QString::fromUtf8("sysinfoLayout"));

        horizontalLayout->addLayout(sysinfoLayout);

        horizontalSpacer = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout->addItem(horizontalSpacer);

        quit_button = new QPushButton(centralWidget);
        quit_button->setObjectName(QString::fromUtf8("quit_button"));

        horizontalLayout->addWidget(quit_button);


        verticalLayout_2->addLayout(horizontalLayout);


        gridLayout->addLayout(verticalLayout_2, 0, 1, 1, 1);

        MainWindow->setCentralWidget(centralWidget);
        menuBar = new QMenuBar(MainWindow);
        menuBar->setObjectName(QString::fromUtf8("menuBar"));
        menuBar->setGeometry(QRect(0, 0, 953, 22));
        MainWindow->setMenuBar(menuBar);
        mainToolBar = new QToolBar(MainWindow);
        mainToolBar->setObjectName(QString::fromUtf8("mainToolBar"));
        MainWindow->addToolBar(Qt::TopToolBarArea, mainToolBar);
        statusBar = new QStatusBar(MainWindow);
        statusBar->setObjectName(QString::fromUtf8("statusBar"));
        MainWindow->setStatusBar(statusBar);

        retranslateUi(MainWindow);

        QMetaObject::connectSlotsByName(MainWindow);
    } // setupUi

    void retranslateUi(QMainWindow *MainWindow)
    {
        MainWindow->setWindowTitle(QCoreApplication::translate("MainWindow", "MainWindow", nullptr));
        images_train->setText(QCoreApplication::translate("MainWindow", "Images", nullptr));
        singleImage_train->setText(QCoreApplication::translate("MainWindow", "Single Image", nullptr));
        fonts_train->setText(QCoreApplication::translate("MainWindow", "Fonts", nullptr));
        multi_lang->setText(QCoreApplication::translate("MainWindow", "KOR-ENG", nullptr));
        transmit_button->setText(QCoreApplication::translate("MainWindow", "Transmit", nullptr));
        version_button->setText(QCoreApplication::translate("MainWindow", "Version", nullptr));
        box_edit->setText(QCoreApplication::translate("MainWindow", "Box edit", nullptr));
        quit_button->setText(QCoreApplication::translate("MainWindow", "Exit", nullptr));
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
