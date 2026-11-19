"! <p class="shorttext synchronized">Hello World (BTP ABAP Environment trial)</p>
"! Run in ADT with F9 (Run As > ABAP Application (Console)).
CLASS zcl_hello_world_kaw DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.
    INTERFACES if_oo_adt_classrun.

ENDCLASS.


CLASS zcl_hello_world_kaw IMPLEMENTATION.

  METHOD if_oo_adt_classrun~main.
    out->write( |Hello World!| ).
    out->write( |Server time: { cl_abap_context_info=>get_system_date( ) DATE = ISO } { cl_abap_context_info=>get_system_time( ) TIME = ISO } UTC| ).
  ENDMETHOD.

ENDCLASS.
