#include "trainworker.h"
#include <QStandardPaths>
#include <QFile>
#include <QDebug>
#include <QDir>
#include <QImageReader>
#include <QFileDialog>
#include <QInputDialog>
#include <QFontDatabase>


TrainWorker::TrainWorker(QWidget *parent) : QWidget(parent)
{
    process = new QProcess(this);
    homeLocation = QStandardPaths::locate(QStandardPaths::HomeLocation, QString(), QStandardPaths::LocateDirectory);
    connect(process, SIGNAL(readyReadStandardOutput()),this, SLOT(manager_print()));
    connect(process, SIGNAL(readyReadStandardError()),this, SLOT(manager_print()));

    projectPath = PROJECT_PATH;
}

TrainWorker::~TrainWorker()
{
    delete process;
}

void TrainWorker::manager_func(QString str)
{
    QStringList list_func;
    list_func << "train_images" << "train_singleImage" << "train_fonts" << "kor_eng";

    switch (list_func.indexOf(str)) {
    case 0:
        train_images();
        break;
    case 1:
        train_singleImage();
        break;
    case 2:
        train_fonts();
        break;
    case 3:
        kor_eng();
        break;
    }

}

void TrainWorker::train_images()
{
    // all-boxes open
    QString all_boxesPath = homeLocation + "mytraining/all-boxes";
    QFile all_boxes(all_boxesPath);
    if(!all_boxes.open(QIODevice::ReadWrite)){
        qDebug() << "box file open error!!";
    }
    QTextStream all_boxes_stream(&all_boxes);

    // search image files
    QDir directory(homeLocation + "mytraining/GT");
    QStringList imageFiles = directory.entryList(QStringList() << "*.jpg" << "*.tif", QDir::Files);

    foreach(QString imageFile, imageFiles) {
        // path initalize
        QString imageFilePath = homeLocation + "mytraining/GT/" + imageFile;
        QString tmp = imageFilePath;
        // 또는 으로 만들면 더 좋을듯
        QString textFilePath = tmp.replace(".jpg",".gt.txt");
        textFilePath = tmp.replace(".tif",".gt.txt");
        QString boxFilePath = tmp.replace(".gt.txt",".box");

        // load image
        QImageReader imageReader(imageFilePath);
        QSize sizeOfImage = imageReader.size();
        int height = sizeOfImage.height();
        int width = sizeOfImage.width();

        // load txt
        QFile textfile(textFilePath);
        textfile.open(QIODevice::ReadOnly);
        QString str;
        QTextStream ts(&textfile);
        str.append(ts.readAll());
        QString newStr = str.trimmed();
        QStringList splitStr = newStr.split(QRegExp("[\r\n]"),QString::SkipEmptyParts);

        // boxfile open
        QFile boxFile(boxFilePath);
        if(!boxFile.open(QIODevice::ReadWrite)){
            qDebug() << "box file open error!!";
        }
        QTextStream stream(&boxFile);

        // make boxfile (inaccuracy)
        foreach(QString str, splitStr){
            for(int i=1; i <= str.length(); i++){
                QChar ch = str[i];
                QChar prev_ch = str[i-1];
                if(ch.combiningClass()){
                    stream << prev_ch.Combining_Left + ch.Combining_Right << " " << 0 << " " << 0 << " " << width << " " << height << " " << 0 << endl;
                    all_boxes_stream << prev_ch.Combining_Left + ch.Combining_Right << " " << 0 << " " << 0 << " " << width << " " << height << " " << 0 << endl;
                }
                else if(!prev_ch.combiningClass()){
                    stream << prev_ch << " " << 0 << " " << 0 << " " << width << " " << height << " " << 0 << endl;
                    all_boxes_stream << prev_ch << " " << 0 << " " << 0 << " " << width << " " << height << " " << 0 << endl;
                }
            }
            stream << "\t" << " " << width << " " << height << " " << width+1 << " " << height+1 << " " << 0 << endl;
            all_boxes_stream << "\t" << " " << width << " " << height << " " << width+1 << " " << height+1 << " " << 0 << endl;
        }
        boxFile.close();
    }
    all_boxes.close();

    QString old_traineddata = QFileDialog::getOpenFileName(this,
                                                           tr("Open traineddata"), homeLocation + "mytraining/tesseract/tessdata", tr("traineddata Files (*.traineddata)"));
    if(old_traineddata.isEmpty() || old_traineddata.isNull()){return;}
    bool ok = true;
    QString program(projectPath + "/Scripts/image_training.sh");
    QString language = QInputDialog::getText(this, tr("START MODEL"),
                                                   tr("language:"), QLineEdit::Normal,
                                                   "kor", &ok);
    if (!ok){return;}
    QString new_language = QInputDialog::getText(this, tr("NEW MODEL"),
                                                 tr("language:"), QLineEdit::Normal, "my_kor", &ok);
    if (!ok){return;}
    QString psm = QInputDialog::getText(this, tr("PSM"), tr("Input page-segment-mode:"),
                                        QLineEdit::Normal, "6", &ok);
    if (!ok){return;}
    QString max_iter = QInputDialog::getText(this, tr("MAX ITERATIONS"),
                                                   tr("Input max iterations:"), QLineEdit::Normal, "500", &ok);
    if (!ok){return;}


    process->setProcessChannelMode(QProcess::MergedChannels);
    process->start("/bin/bash", QStringList() << program <<
                   language << new_language << psm << max_iter << old_traineddata);
    emit process_start();
    if(process->waitForFinished(-1))
    {
        emit process_finish();
    }

}
void TrainWorker::train_singleImage()
{
    QString program(projectPath + "/Scripts/single_image.sh");

    QString image_file = QFileDialog::getOpenFileName(this,
                                                      tr("Open Image File"), homeLocation, tr("Image Files (*.png)"));
    if(image_file.isEmpty() || image_file.isNull()){return;}
    QString old_traineddata = QFileDialog::getOpenFileName(this,
                                                           tr("Open traineddata"), homeLocation + "mytraining/tesseract/tessdata", tr("traineddata Files (*.traineddata)"));
    if(old_traineddata.isEmpty() || old_traineddata.isNull()){return;}
    bool ok = true;
    QString language = QInputDialog::getText(this, tr("START MODEL"),
                                                   tr("language:"), QLineEdit::Normal,
                                                   "kor", &ok);
    if (!ok){return;}
    QString new_language = QInputDialog::getText(this, tr("NEW MODEL"),
                                                 tr("language:"), QLineEdit::Normal, "my_kor", &ok);
    if (!ok){return;}
    QString psm = QInputDialog::getText(this, tr("PSM"), tr("Input page-segment-mode:"),
                                        QLineEdit::Normal, "6", &ok);
    if (!ok){return;}
    QString max_iter = QInputDialog::getText(this, tr("MAX ITERATIONS"),
                                                   tr("Input max iterations:"), QLineEdit::Normal, "1200", &ok);
    if (!ok){return;}


    process->setProcessChannelMode(QProcess::MergedChannels);
    process->start("/bin/bash", QStringList() << program << image_file <<
                   language << new_language << psm << max_iter << old_traineddata);
    emit process_start();
    if(process->waitForFinished(-1))
    {
        emit process_finish();
    }
}
void TrainWorker::train_fonts()
{
    QString program(projectPath + "/Scripts/fontFinetuning.sh");

    // gtk-message warning, not error // need to change start directory.
    QString font_path = QFileDialog::getOpenFileName(this,
                                                     tr("Open Font"), "/usr/share/fonts", tr("Font Files (*.ttf)"));
    if(font_path.isEmpty() || font_path.isNull()){return;}

    QString old_traineddata = QFileDialog::getOpenFileName(this,
                                                           tr("Open traineddata"),
                                                           homeLocation + "mytraining/tesseract/tessdata", tr("traineddata Files (*.traineddata)"));
    if(font_path.isEmpty() || font_path.isNull()){return;}

    bool ok = true;
    QString iterations = QInputDialog::getText(this, tr("Iterating counts"),
                                                   tr("Iterating Counts:"), QLineEdit::Normal,
                                                   "6000", &ok);
    if (!ok){return;}


    int id = QFontDatabase::addApplicationFont(font_path);
    QString font_name = QFontDatabase::applicationFontFamilies(id).at(0);

    QString language = QInputDialog::getText(this, tr("START MODEL"),
                                                   tr("language:"), QLineEdit::Normal,
                                                   "kor", &ok);
    if (!ok){return;}

    process->setProcessChannelMode(QProcess::MergedChannels);
    process->start("/bin/bash", QStringList() << program << font_name << iterations << language << old_traineddata);

    emit process_start();
    if(process->waitForFinished(-1))
    {
        emit process_finish();
    }
}
void TrainWorker::kor_eng()
{
    QString program(projectPath + "/Scripts/korengTrain.sh");

    // 현재는 기존 bestdata사용하지만 추후에는 기존파일에 계속 더할 수 있도록 그리고 업데이트의 경우 학습파일만들기 생략시키기 쉘에서
    //QString original_traineddata = "";

    QString training_text = QFileDialog::getOpenFileName(this,
                                                         tr("Open Training text"), homeLocation, tr("Training texts (*.training_text)"));
    if(training_text.isEmpty() || training_text.isNull()){return;}
    bool ok = true;
    QString iterations = QInputDialog::getText(this, tr("Iterating counts"),
                                                   tr("Iterating Counts:"), QLineEdit::Normal,
                                                   "60000", &ok);
    if (!ok){return;}

    process->setProcessChannelMode(QProcess::MergedChannels);
    process->start("/bin/bash", QStringList() << program << training_text << iterations);
    emit process_start();
    if(process->waitForFinished(-1))
    {
        emit process_finish();
    }
}
void TrainWorker::manager_print()
{
    QByteArray data = process->readAll();
    print = QString::fromStdString(data.toStdString());
    emit process_print();
}
