import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { MegaMenuModule } from 'primeng/megamenu';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import {DropdownModule} from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';
import {FileUploadModule} from 'primeng/fileupload';
import {TabMenuModule} from 'primeng/tabmenu';
import {ListboxModule} from 'primeng/listbox';
import {PaginatorModule} from 'primeng/paginator';
import {EditorModule} from 'primeng/editor';
import {CheckboxModule} from 'primeng/checkbox';
import {ProgressBarModule} from 'primeng/progressbar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TooltipModule} from 'primeng/tooltip';
import {RatingModule} from 'primeng/rating';
import {StepsModule} from 'primeng/steps';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {GalleriaModule} from 'primeng/galleria';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {PasswordModule} from 'primeng/password';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {FieldsetModule} from 'primeng/fieldset';

@NgModule({
    exports: [
        FieldsetModule,
        CarouselModule,
        PasswordModule,
        AutoCompleteModule,
        TabsModule,
        GalleriaModule,
        ConfirmDialogModule,
        DialogModule,
        StepsModule,
        RatingModule,
        TooltipModule,
        RadioButtonModule,
        ProgressBarModule,
        CheckboxModule,
        EditorModule,
        PaginatorModule,
        ListboxModule,
        TabMenuModule,
        FileUploadModule,
        InputTextModule,
        ButtonModule,
        PanelModule,
        ToastModule,
        MegaMenuModule,
        TableModule,
        MessageModule,
        CardModule,
        ChartModule,
        ProgressSpinnerModule,
        OverlayPanelModule,
        BreadcrumbModule,
        CalendarModule,
        SidebarModule,
        DynamicDialogModule,
        InputTextareaModule,
        MessagesModule,
        DropdownModule,
        TabViewModule
    ]
})
export class NgPrimeModule { }
