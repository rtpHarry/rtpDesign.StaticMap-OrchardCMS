/// <reference path="../../Orchard.jQuery/Scripts/jquery-1.11.1.js" />
/// <reference path="../../Orchard.jQuery/Scripts/jquery.ui.dialog.js" />


// BUG - load existing values doesn't honor zoom level

(function ($) {
    var currentLat = 0,
        currentLng = 0,
        currentZoomLevel = 1,
        isInitialGeocode = true;

    function setFindAddressDefaults(){
        currentLat = Number($(".StaticMapLatitude").val());
        currentLng = Number($(".StaticMapLongitude").val());
        currentZoomLevel = Number($(".StaticMapZoomLevel").val());
        isInitialGeocode = true;
    }

    function saveFindAddressResults() {
        $(".StaticMapLatitude").val(currentLat);
        $(".StaticMapLongitude").val(currentLng);
        $(".StaticMapZoomLevel").val(currentZoomLevel);
    }

    function setGeocompleteToCurrentValues() {
        var StaticMapGeocomplete = $("#StaticMapGeocomplete");

        if (currentLat == 0 && currentLng == 0) {
            StaticMapGeocomplete
                .val("United Kingdom")
                .geocomplete("find", "United Kingdom");
        } else {
            StaticMapGeocomplete
                .val(currentLat + ", " + currentLng)
                .geocomplete("find", currentLat + ", " + currentLng);
                //.geocomplete({ bounds: true });
            //StaticMapGeocomplete.geocomplete("map").setCenter({ lat: currentLat, lng: currentLng });
            //StaticMapGeocomplete.geocomplete("map").setZoom(currentZoomLevel);
        }
    }

    function triggerMapResize() {
        var map = $("#StaticMapGeocomplete").geocomplete("map"),
            center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    }

    function configureDialogPanel() {
        $("#StaticMapPanelSource").dialog({
            autoOpen: false,
            modal: true,
            draggable: false,
            resizable: true,
            resize: function (event, ui) {
                triggerMapResize();
            },
            width: '60%',
            open: function (event, ui) {
                triggerMapResize();
                setFindAddressDefaults();
                setGeocompleteToCurrentValues();
            },
            buttons: [{
                text: "Save Address",
                click: function () {
                    saveFindAddressResults();
                    $(this).dialog("close");
                }
            }, {
                text: "Cancel",
                click: function () {
                    $(this).dialog("close");
                }
            }]
        });

        $("#StaticMapFindAddress").click(function (e) {
            $("#StaticMapPanelSource").dialog("open");
            e.preventDefault();
        });
    }

    function configureGeocode() {
        $("#StaticMapGeocomplete")
            .geocomplete({
                map: "#StaticMapGoogleMapCanvas",
                mapOptions: {
                    scrollwheel: true
                },
                markerOptions: {
                    draggable: true
                },
                maxZoom: 11
            })
            .bind("geocode:result", function (event, result) {
                currentLat = result.geometry.location.lat();
                currentLng = result.geometry.location.lng();
                //alert("result: " + currentLat + ", " + currentLng);
            })
            .bind("geocode:dragged", function (event, latLng) {
                currentLat = latLng.lat();
                currentLng = latLng.lng();
                $("#StaticMapGeocomplete").val(currentLat + ", " + currentLng);
                //$("#StaticMapReset").show();
            })
            .bind("geocode:zoom", function (event, zoomLevel) {
                //alert("zoom: " + zoomLevel);
                currentZoomLevel = zoomLevel;
            });

        /*
        $("#StaticMapReset").click(function () {
            $("#StaticMapGeocomplete").geocomplete("resetMarker");
            $("#StaticMapReset").hide();
            return false;
        });
        */

        $("#StaticMapFind").click(function () {
            $("#StaticMapGeocomplete").trigger("geocode");
        })
    }


    // startup
    $(document).ready(function () {
        configureGeocode();
        configureDialogPanel();
    });

    /*
    $("#StaticMapPanelSource").dialog({
        autoOpen: false,
        modal: true,
        draggable: false,
        resizable: true,
        width: '60%',

        open: function (event, ui) {
            configureGeocodePanel();
        },

        buttons: [{
            text: "Save Address",
            click: function () {
                // TODO : SAVE BACK TO PARENT HERE
                $(this).dialog("destroy");
            }
        }, {
            text: "Cancel",
            click: function () {
                $(this).dialog("destroy");
            }
        }]
    });

    function getDefaultLocation() {
        var LatitudeInput = $(".StaticMapLatitude"),
            LongitudeInput = $(".StaticMapLongitude"),
            searchTerm = "London"; // default search term

        if (!isEmptyOrZero(LatitudeInput) && !isEmptyOrZero(LongitudeInput)) {
            searchTerm = LatitudeInput.val() + ", " + LongitudeInput.val();
        }

        return searchTerm;
    }

    function isEmptyOrZero(inputField) {
        return inputField.val().length == 0 || inputField.val() == 0;
    }

    function getDefaultZoomLevel() {
        var ZoomLevelInput = $(".StaticMapZoomLevel");
        return isEmptyOrZero(ZoomLevelInput) ? 14 : ZoomLevelInput.val();
    }

    function configureGeocodePanel() {
        $("#StaticMapGeocomplete")
            .geocomplete({
                map: ".StaticMapGoogleMapCanvas",
                location: getDefaultLocation(),
                mapOptions: {
                    zoom: getDefaultZoomLevel()
                },
               // details: "fieldset.StaticMap",
               // detailsAttribute: "data-geo",
                markerOptions: {
                    draggable: true
                }
            })
            .bind("geocode:dragged", function (event, latLng) {
                $(".StaticMapLatitude").val(latLng.lat());
                $(".StaticMapLongitude").val(latLng.lng());
                $("#StaticMapReset").show();
            })
            .bind("geocode:zoom", function (event, zoomLevel) {
                $(".StaticMapZoomLevel").val(zoomLevel);
            });
    }
    */
})(jQuery);