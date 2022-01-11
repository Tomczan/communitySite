# Generated by Django 3.2.8 on 2022-01-11 16:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
        ('actions', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='action',
            name='target_ct',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='target_obj', to='contenttypes.contenttype'),
        ),
        migrations.AddField(
            model_name='action',
            name='target_id',
            field=models.PositiveIntegerField(blank=True, db_index=True, null=True),
        ),
    ]
