This is the repository of the ARI project. 
ARI stands for App para Registro en Iglesias, in spanish. 

LOGS

Jun 11 2024
Long time without documenting huh?
Well. I dont even know if this README counts as documenting but, here I am.
The app is almost complete. The new Visitor, and New Anomalia functionalities are complete.
The visitors list has the New Visit function working well.
The Reports page is being under construction. More speciffically, I am creating the previews of the Visitors, Anomalias, consolidado and Asistencias database information. The button that downloads the info form firebase and sends it via email in a JSON is working too. 



Apr 12 2024
After a long fight with a simple bug I just created the page for editting the New visitors information.
Yeah. that is it.



Apr 11 2024
Several Changes were done in order to grant more order to the hierarchy of the files:
the keyword "Visitor" was used to refer the new visitor and the keyword "member" to refer to the actual members of the church

NewVisitor --> Create Visitor
Visitor--> Renders a list of the visitors
DetailsVisitor --> page for edit a single visitor. From here, visitors can be sent to the Members list.

Members --> List of the members
DetailsMember --> page for edit a single member

I think that some tweaks are needed in the Anomalias set of pages. The recent changes made in ther DetailsAnomalia page are not reflected in the Anomalias page when you hit the Back button from DetailsAnomalia. 



----

Apr 10 2024
The pages for Reports or anomalias are almost complete. The user can create, see and edit the Reports.

I need to do the same for the Visitors.

There will be a change and I will need to create another collection for New User exclusively.
I would need to find a way to pass one document from the new users to the Old users, or Membresia.

Then, I will create a visualizer for the stored data in the Database.

---

At the moment, the Create new Visitor feature is almost done. 
The Edit Visitor feature is almost complete too.
This feature only needs to redirect the user to the actual edition page when tapping the name of a member and update the edited document

The next part is start with the Report creation feature and finish the Edit visitor functionality.

Do not forget to create the roles and privileges for the users 


