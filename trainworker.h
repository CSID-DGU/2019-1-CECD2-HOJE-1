#ifndef TRAINWORKER_H
#define TRAINWORKER_H

#include <QString>
#include <QProcess>
#include <QWidget>

class TrainWorker : public QWidget
{
    Q_OBJECT
public:
    explicit TrainWorker(QWidget *parent = nullptr);
    ~TrainWorker();
    void manager_func(QString);

    QString homeLocation;
    QString projectPath;
    QString print;
signals:
    void process_start();
    void process_finish();
    void process_print();

public slots:
    void manager_print();

private:
    QProcess* process;
    // 학습 함수
    void train_images();
    void train_singleImage();
    void train_fonts();
    void kor_eng();

};

#endif // TRAINWORKER_H
